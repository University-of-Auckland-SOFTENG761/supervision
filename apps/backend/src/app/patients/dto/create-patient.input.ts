import { InputType, Field } from '@nestjs/graphql';
import { Sex, Ethnicity } from '@supervision/patients/database/patient.entity';

@InputType()
export class CreatePatientInput {
  // TODO: add field descriptions
  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => Date, { nullable: false })
  dateOfBirth: Date;

  @Field(() => Sex)
  sex: Sex;

  @Field(() => Ethnicity)
  ethnicity: Ethnicity;

  @Field(() => String)
  school: string;

  @Field(() => String)
  yearLevel: number;

  @Field(() => Date)
  yearLevelLastUpdated: Date;

  @Field(() => String)
  room: string;

  @Field(() => String)
  caregiverFirstName: string;

  @Field(() => String)
  caregiverLastName: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  streetAddress: string;

  @Field(() => String)
  suburb: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  postcode: string;

  @Field(() => String)
  recalls: string;

  @Field(() => String)
  adminNotes: string;

  @Field(() => String)
  screeningList: string;
}
