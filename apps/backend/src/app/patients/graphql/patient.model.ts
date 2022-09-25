import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '@supervision/shared';
import { Ethnicity, Gender } from '@supervision/patients';
import { DateOfBirthScalar } from './date-of-birth.scalar';

registerEnumType(Ethnicity, {
  name: 'Ethnicity',
});

registerEnumType(Gender, {
  name: 'Gender',
});

@ObjectType({ description: 'patient' })
export class PatientModel extends BaseModel {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field(() => DateOfBirthScalar, { nullable: true })
  dateOfBirth: Date;

  @Field(() => Gender, { nullable: true })
  gender: Gender;

  @Field(() => Ethnicity, { nullable: true })
  ethnicity: Ethnicity;

  @Field({ nullable: true })
  school: string;

  @Field({ nullable: true })
  yearLevel: number;

  @Field({ nullable: true })
  yearLevelLastUpdated: Date;

  @Field({ nullable: true })
  room: string;

  @Field({ nullable: true })
  caregiverFirstName: string;

  @Field({ nullable: true })
  caregiverLastName: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  streetAddress: string;

  @Field({ nullable: true })
  suburb: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  postcode: string;

  @Field({ nullable: true })
  adminNotes: string;

  @Field({ nullable: true })
  screeningList: string;

  @Field(() => [String], { nullable: true })
  consultIds: string[];
}
