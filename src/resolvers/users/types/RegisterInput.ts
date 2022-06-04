import { IsNotEmpty, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsPhoneNumberAlreadyExist } from '../../../helpers/isEmail';

const phoneNumberMsg: string = 'phone number must be between 6 and 20 characters';

@InputType()
export class RegisterInput {
  @IsPhoneNumberAlreadyExist({ message: 'phone number already in use' })
  @Field()
  @Length(6, 20, { message: phoneNumberMsg })
  @IsNotEmpty({ message: phoneNumberMsg })
  phoneNumber: string;
}
