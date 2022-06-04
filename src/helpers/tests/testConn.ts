import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'tutorniatest',
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + '/../models/*.*'],
  });
};
