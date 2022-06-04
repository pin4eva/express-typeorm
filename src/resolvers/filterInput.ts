import { Field, InputType } from 'type-graphql';

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  limit: number;

  @Field({ nullable: true })
  skip: number;

  @Field({ nullable: true })
  searchTerm: string;
}
