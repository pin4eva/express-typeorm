import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../../entity/User';
import { phoneOtpConfirmationPrefix } from '../../../utils/constants';
import { redis } from '../../../utils/redis';

@Resolver()
export class ConfirmStudentResolver {
  @Mutation(() => String)
  async verifyStudentPhone(@Arg('otp') otp: string): Promise<String> {
    const userId = await redis.get(phoneOtpConfirmationPrefix + otp);
    console.log(userId);
    if (!userId) throw Error('[Invalid otp]: please provide a valid otp');
    await User.update({ id: parseInt(userId!) }, { confirmed: true });
    await redis.del(phoneOtpConfirmationPrefix + otp);
    return 'You have successfully verified your phone number';
  }
}
