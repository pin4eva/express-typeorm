import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entity/User';
import { IsPhoneNumberAlreadyExist } from '../../../helpers/isEmail';
import { createAndSendConfirmationOtpToken } from '../../../utils/createConfirmationOtp';
import { RegisterInput } from '../types/RegisterInput';

@Resolver()
export class RegisterResolver {
  @Mutation(() => String)
  @IsPhoneNumberAlreadyExist({ message: 'User already exist' })
  async registerStudent(@Arg('input') { phoneNumber }: RegisterInput): Promise<String> {
    const user = await User.create({
      phoneNumber,
    }).save();
    await createAndSendConfirmationOtpToken(user.id, phoneNumber);
    return `An OTP has been sent to this number ${phoneNumber}`;
  }
}
