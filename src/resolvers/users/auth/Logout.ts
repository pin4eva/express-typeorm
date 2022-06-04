import { Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../../types/Context';
import config from '../../../config';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logoutStudent(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err: any) => {
        if (err) {
          console.log(err);
          return rej(false);
        }
        ctx.res.clearCookie(config.general.sessionId);
        return res(true);
      }),
    );
  }
}
