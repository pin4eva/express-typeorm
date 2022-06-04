import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';
import { isAuth } from '../../middleware/isAuth';
import { User } from '../../entity/User';
import { MyContext } from '../../types/Context';

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) throw Error('No such user exist');

    return await User.findOne(ctx.req.session!.userId);
  }
}
