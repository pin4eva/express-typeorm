import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import connectRedis from 'connect-redis';
import cors from 'cors';
import http from 'http';
import express, { Request, Response } from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import { createConnection, getConnection } from 'typeorm';
import config from './config/index';
import { createSchema } from './createSchema';
import { redis } from './utils/redis';
// import { sendAirtime } from './utils/sendAirtime';

declare module 'express-session' {
  interface Session {
    userId: number;
    adminId: number;
  }
}

async function main() {
  await createConnection();
  const app = express();
  const httpServer = http.createServer(app);
  const RedisStore = connectRedis(session);
  const schema = await createSchema();

  try {
    const server = new ApolloServer({
      schema,
      context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerLoaderPlugin({
          typeormGetConnection: getConnection,
        }),
      ],
    });

    app.use(
      cors({
        credentials: true,
        origin: '*',
      }),
    );

    if (app.get('env') === 'production') {
      app.set('trust proxy', 1);
    }
    app.use(
      session({
        store: new RedisStore({
          client: redis,
          host: 'localhost',
          port: 6379,
          ttl: 86400,
        }),
        name: config.general.sessionId,
        secret: config.redis.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        },
      }),
    );

    await server.start();
    server.applyMiddleware({ app, path: '/api/v1' });
    await new Promise<void>((resolve) => httpServer.listen({ port: config.server.port }, resolve));
    console.log(`🚀 Server ready at ${config.url.backendUrl}${server.graphqlPath}`);
  } catch (error: any) {
    console.log('Server Error! \n', error?.message);
  }
}

main();
