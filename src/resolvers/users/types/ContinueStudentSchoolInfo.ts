import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { PasswordMixin } from '../../../helpers/PasswordInput';

const emptyMsg: string = 'can not be empty';

@InputType()
export class ContinueStudentSchoolInfoInput extends PasswordMixin(class {}) {
  @Field()
  @IsNotEmpty({ message: `school ${emptyMsg}` })
  schoolId: string;

  @IsNotEmpty({ message: `faculty ${emptyMsg}` })
  @Field()
  facultyId: string;

  @IsNotEmpty({ message: `faculty ${emptyMsg}` })
  @Field()
  departmentId: string;

  @Field()
  @IsNotEmpty({ message: 'Phonenumber can not be empty' })
  phoneNumber: string;
}
