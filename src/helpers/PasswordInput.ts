import { Length } from 'class-validator';
import { InputType, Field, ClassType } from 'type-graphql';

export const PasswordMixin = <TBase extends ClassType>(BaseClass: TBase) => {
  @InputType({ isAbstract: true })
  class PasswordInput extends BaseClass {
    @Field()
    @Length(6, 255, { message: 'Password can only be from 6 to 255 characters' })
    password: string;
  }
  return PasswordInput;
};
