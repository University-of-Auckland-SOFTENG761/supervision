import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '@supervision/shared';
import { Ethnicity, Sex } from '@supervision/patients';

registerEnumType(Ethnicity, {
  name: 'Ethnicity',
});

registerEnumType(Sex, {
  name: 'Sex',
});

@ObjectType({ description: 'patient' })
export class PatientModel extends BaseModel {
  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  dateOfBirth: Date;

  @Field(() => Sex)
  sex: Sex;

  @Field(() => Ethnicity)
  ethnicity: Ethnicity;

  @Field()
  school: string;

  @Field()
  yearLevel: number;

  @Field()
  yearLevelLastUpdated: Date;

  @Field()
  room: string;

  @Field()
  caregiverFirstName: string;

  @Field()
  caregiverLastName: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field()
  streetAddress: string;

  @Field()
  suburb: string;

  @Field()
  city: string;

  @Field()
  postcode: string;

  @Field(() => [String])
  recalls: [string];

  @Field()
  adminNotes: string;

  @Field()
  screeningList: string;
}
