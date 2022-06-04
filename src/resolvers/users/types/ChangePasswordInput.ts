import { IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { PasswordMixin } from '../../../helpers/PasswordInput';

@InputType()
export class ChangePasswordInput extends PasswordMixin(class {}) {
  @IsEmail()
  @Field()
  token: string;
}
