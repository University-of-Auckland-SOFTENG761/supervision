import { InputType, Int, Field } from '@nestjs/graphql';

enum Sex {
  'Female',
  'Male',
  'Other',
  'PreferNotToSay',
}

enum Ethnicity {
  'NZEUROPEAN',
  'OTHEREUROPEAN',
  'NZMAORI',
  'SAMOAN',
  'COOKISLANDMAORI',
  'TONGAN',
  'NIUEAN',
  'TOKELAUAN',
  'FIJIAN',
  'OTHERPACIFICISLAND',
  'SOUTHEASTASIAN',
  'CHINESE',
  'INDIAN',
  'OTHERASIAN',
  'MIDDLEEASTERN',
  'LATAMHISPANIC',
  'AFRICAN',
  'OTHERETHNICITY',
}

@InputType()
export class CreatePatientInput {
  // TODO: Add descriptions to fields and add consults and dispensing types
  @Field(() => String, { description: 'First name of the patient' })
  firstName: string;
  @Field(() => String, { description: 'Last name of the patient' })
  lastName: string;
  @Field()
  dateOFBirth: Date; // Not sure if this is the right data type
  @Field(() => Sex, { description: 'Sex of the patient' })
  sex: Sex;
  @Field(() => String, { description: 'School of the patient' })
  school: string;
  @Field(() => Int, { description: 'Year level of patient at school' })
  yearLevel: number;
  @Field(() => String, { description: 'School room of the patient' })
  schoolRoom: string;
  @Field(() => String, { description: "Patient caregiver's first name" })
  caregiverFirstName: string;
  @Field(() => String, { description: "Patient caregiver's last name" })
  caregiverLastName: string;
  @Field(() => String, { description: 'Phone number of the patient' })
  phoneNumber: string;
  @Field(() => String, { description: 'Email of the patient' })
  email: string;
  @Field(() => String, { description: 'Street Address of the patient' })
  streetAddress: string;
  @Field(() => String, { description: 'City of the patient' })
  city: string;
  @Field(() => String, { description: 'Postcode of the patient' })
  postcode: string;

  // Change consults and dispensing
  @Field(() => [String], { description: 'Consults of the patient' })
  consults: string[];
  @Field(() => [String], { description: 'Dispensing of the patient' })
  dispensing: string[];

  @Field(() => [String], { description: 'Recalls of the patient' })
  recalls: string[];
  @Field(() => String, { description: 'Admin notes of the patient' })
  adminNotes: string;
  @Field(() => String, { description: 'Screening list of the patient' })
  screeningList: string;
}
