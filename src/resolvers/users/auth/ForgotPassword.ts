import { User } from '../../../entity/User';
import { forgotPasswordPrefix } from '../../../utils/constants';
import { redis } from '../../../utils/redis';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { v4 } from 'uuid';
import { createAndSendConfirmationOtpToken } from '../../../utils/createConfirmationOtp';

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') phoneNumber: string): Promise<String> {
    const user = await User.findOne({ where: { phoneNumber } });
    if (!user) throw Error('User not found');
    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24); // 1 day
    await createAndSendConfirmationOtpToken(user.id, phoneNumber);
    return `An OTP has been sent to this number ${phoneNumber}`;
  }
}
