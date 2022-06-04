import { Arg, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../../../entity/User';
import { IsEmailAlreadyExist, PhoneNumberIsVerified } from '../../../helpers/isEmail';
import { ContinueStudentSchoolInfoInput } from '../types/ContinueStudentSchoolInfo';

@Resolver()
export class UpdateStudentSchoolInfoResolver {
  @Mutation(() => User)
  @IsEmailAlreadyExist({ message: 'User already exist' })
  @PhoneNumberIsVerified({ message: 'You must verify your phone number to perform this operation' })
  async updateStudentSchoolInfo(
    @Arg('input')
    { phoneNumber, school, faculty, department }: ContinueStudentSchoolInfoInput,
  ): Promise<User> {
    const student = await User.findOne({ where: { phoneNumber } });
    if (student) {
      const user = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ school, faculty, department })
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
