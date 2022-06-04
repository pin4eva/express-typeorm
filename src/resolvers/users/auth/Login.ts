import bcrypt from 'bcryptjs';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entity/User';
import { PhoneNumberIsVerified } from '../../../helpers/isEmail';
import { MyContext } from '../../../types/Context';
import { sendAirtime } from '../../../utils/sendAirtime';
import { LoginInput } from '../types/LoginInput';

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: false })
  @PhoneNumberIsVerified({ message: 'You must verify your phone number to perform this operation' })
  async loginStudent(
    @Arg('input') { phoneNumber, password }: LoginInput,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { phoneNumber } });
    if (!user) throw Error('No such user');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw Error('Phone number or Password is incorrect');
    if (!user.confirmed) throw Error('Please verify your phone number to login');
    if (!user.firstName) throw Error('You must update your details to login');
    ctx.req.session!.userId = user.id;
    if (!user.hasReceivedAirtime) {
      sendAirtime({ phoneNumber, amount: 50 });
    }
    return user;
  }
}
