import bcrypt from 'bcryptjs';
import { User } from '../../../entity/User';
import { IsEmailAlreadyExist, PhoneNumberIsVerified } from '../../../helpers/isEmail';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { ContinueRegisterInput } from '../types/ContinueRegisterInput';
import { getConnection } from 'typeorm';

@Resolver()
export class UpadateStudentDetailsResolver {
  @Mutation(() => User)
  @IsEmailAlreadyExist({ message: 'User already exist' })
  @PhoneNumberIsVerified({ message: 'You must verify your phone number to perform this operation' })
  async continueStudentRegistration(
    @Arg('input')
    { password, phoneNumber, ...rest }: ContinueRegisterInput,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const student = await User.findOne({ where: { phoneNumber } });
    if (student) {
      const user = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ password: hashedPassword, phoneNumber, ...rest })
        .where('phoneNumber = :phoneNumber', {
          phoneNumber,
        })
        .returning('*')
        .execute()
        .then((response) => {
          return response.raw[0];
        });

      return user;
    }
    throw new Error(`No such user with this phone number ${phoneNumber} was found`);
  }
}
