import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
  @Field()
  phoneNumber: string;

  @Field()
  password: string;
}
