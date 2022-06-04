import { PasswordMixin } from '../../../helpers/PasswordInput';
import { Field, InputType } from 'type-graphql';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import { IsEmailAlreadyExist } from '../../../helpers/isEmail';
import { StudentGender } from '../../../entity/User';

const nameMsg: string = 'name must be between 1 and 50';

@InputType()
export class ContinueRegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 50, { message: nameMsg })
  @IsNotEmpty({ message: nameMsg })
  firstName: string;

  @Length(1, 50, { message: nameMsg })
  @IsNotEmpty({ message: nameMsg })
  @Field()
  lastName: string;

  @IsEmailAlreadyExist({ message: 'Email already in use' })
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Gender can not be empty' })
  gender: StudentGender;

  @Field()
  @IsNotEmpty({ message: 'Phonenumber can not be empty' })
  phoneNumber: string;
}
