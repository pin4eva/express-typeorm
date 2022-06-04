import { IsEmail } from 'class-validator';
import { ELevel } from '../../../../entity/PastQuestions';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreatePastQuestionInput {
  @IsEmail()
  @Field()
  question: string;

  @Field()
  solutions: string;

  @Field()
  course: string;

  @Field()
  image: string;

  @Field()
  level: ELevel;
}
