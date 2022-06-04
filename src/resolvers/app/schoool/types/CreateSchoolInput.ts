import { Field, InputType } from 'type-graphql';
import { EInstitutionType } from '../../../../entity/School';

@InputType()
export class CreateSchoolInput {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field()
  institutionType: EInstitutionType;
}

@InputType()
export class CreateFacultyInput {
  @Field()
  name: string;
}
