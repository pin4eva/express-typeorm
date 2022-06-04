import { Field, InputType } from 'type-graphql';
import { Filter } from '../types';

@InputType()
export class FiltersExpressionInput {
  @Field()
  filters: Filter;
}
