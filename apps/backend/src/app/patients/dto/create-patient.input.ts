import { InputType, Field } from '@nestjs/graphql';
import {
  Gender,
  Ethnicity,
} from '@supervision/patients/database/patient.entity';

@InputType()
export class CreatePatientInput {
  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => Date, { nullable: true })
  dateOfBirth: Date;

  @Field(() => Gender, { nullable: true })
  gender: Gender;

  @Field(() => Ethnicity, { nullable: true })
  ethnicity: Ethnicity;

  @Field(() => String, { nullable: true })
  school: string;

  @Field(() => Number, { nullable: true })
  yearLevel: number;

  @Field(() => Date, { nullable: true })
  yearLevelLastUpdated: Date;

  @Field(() => String, { nullable: true })
  room: string;

  @Field(() => String, { nullable: true })
  caregiverFirstName: string;

  @Field(() => String, { nullable: true })
  caregiverLastName: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  streetAddress: string;

  @Field(() => String, { nullable: true })
  suburb: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  postcode: string;

  @Field(() => [String], { nullable: true })
  recalls: [string];

  @Field(() => String, { nullable: true })
  adminNotes: string;

  @Field(() => String, { nullable: true })
  screeningList: string;

  @Field(() => [String], { nullable: true })
  consultIds: string[];
}
