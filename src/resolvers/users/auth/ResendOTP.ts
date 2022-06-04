import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entity/User';
import { IsPhoneNumberAlreadyExist } from '../../../helpers/isEmail';
import { createAndSendConfirmationOtpToken } from '../../../utils/createConfirmationOtp';
// import sendMessage from '../../../utils/sendMessage';
import { RegisterInput } from '../types/RegisterInput';
@Resolver()
export class ResendStudentOTPResolver {
  @Mutation(() => String)
  @IsPhoneNumberAlreadyExist({ message: 'User already exist' })
  async resendStudentOTP(@Arg('input') { phoneNumber }: RegisterInput): Promise<String> {
    const user = await User.findOne({ where: { phoneNumber } });
    if (user) {
      await createAndSendConfirmationOtpToken(user.id, phoneNumber);
      return `An OTP has been sent to this number ${phoneNumber}`;
    }
    return `No such user with this phone number ${phoneNumber} was found`;
  }
}
