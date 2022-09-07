import { Field, ObjectType } from '@nestjs/graphql';
import { PatientModel } from '@supervision/patients/graphql/patient.model';
import { BaseModel } from '@supervision/shared';
import { UserModel } from '@supervision/users/graphql/user.model';

@ObjectType({ description: 'consult' })
export class ConsultModel extends BaseModel {
  @Field(() => UserModel, { nullable: false })
  user: UserModel;

  @Field(() => PatientModel, { nullable: false })
  patient: PatientModel;

  @Field({ nullable: false })
  dateConsentGiven: Date;

  @Field({ nullable: true })
  history: string;

  @Field({ nullable: true })
  medication: string;

  @Field({ nullable: true })
  visualAcuityLeft: string;

  @Field({ nullable: true })
  visualAcuityRight: string;

  @Field({ nullable: true })
  visualAcuityBoth: string;

  @Field({ nullable: true })
  nearAcuityLeft: string;

  @Field({ nullable: true })
  nearAcuityRight: string;

  @Field({ nullable: true })
  nearAcuityBoth: string;

  @Field({ nullable: true })
  coverTestDistance: string;

  @Field({ nullable: true })
  coverTestNear: string;

  @Field({ nullable: true })
  nearPointOfConvergence: string;

  @Field({ nullable: true })
  motility: string;

  @Field({ nullable: true })
  pupils: string;

  @Field({ nullable: true })
  pupillaryDistance: number;

  @Field({ nullable: true })
  otherField: string;

  @Field({ nullable: true })
  eyePressureLeft: number;

  @Field({ nullable: true })
  eyePressureRight: number;

  @Field({ nullable: true })
  eyePressureTimestamp: Date;

  @Field({ nullable: true })
  isCyclopentolate: boolean;

  @Field({ nullable: true })
  cyclopentolateTimestamp: Date;

  @Field({ nullable: true })
  isTropicamide: boolean;

  @Field({ nullable: true })
  tropicamideTimestamp: Date;

  @Field({ nullable: true })
  binocularVision: string;

  @Field({ nullable: true })
  anteriorHealth: string;

  @Field({ nullable: true })
  posteriorHealth: string;

  @Field({ nullable: true })
  diagnosis: string;

  @Field({ nullable: true })
  management: string;

  @Field({ nullable: true })
  layPersonNotes: string;

  @Field({ nullable: true })
  spectacleCode: string;

  @Field({ nullable: true })
  spectacleColour: string;

  @Field({ nullable: true })
  spectacleLensType: string;

  @Field({ nullable: true })
  spectacleHeights: string;

  @Field({ nullable: true })
  spectacleNotes: string;

  @Field({ nullable: true })
  prevSpecRxGivenRightEyeSphere: number;

  @Field({ nullable: true })
  prevSpecRxGivenRightCylinder: number;

  @Field({ nullable: true })
  prevSpecRxGivenRightAxis: number;

  @Field({ nullable: true })
  prevSpecRxGivenRightVA: string;

  @Field({ nullable: true })
  prevSpecRxGivenRightAdd: string;

  @Field({ nullable: true })
  prevSpecRxGivenLeftEyeSphere: number;

  @Field({ nullable: true })
  prevSpecRxGivenLeftCylinder: number;

  @Field({ nullable: true })
  prevSpecRxGivenLeftAxis: number;

  @Field({ nullable: true })
  prevSpecRxGivenLeftVA: string;

  @Field({ nullable: true })
  prevSpecRxGivenLeftAdd: string;

  @Field({ nullable: true })
  prevSpecRxGivenBVA: string;

  @Field({ nullable: true })
  habitualRightEyeSphere: number;

  @Field({ nullable: true })
  habitualRightCylinder: number;

  @Field({ nullable: true })
  habitualRightAxis: number;

  @Field({ nullable: true })
  habitualRightVA: string;

  @Field({ nullable: true })
  habitualRightAdd: string;

  @Field({ nullable: true })
  habitualLeftEyeSphere: number;

  @Field({ nullable: true })
  habitualLeftCylinder: number;

  @Field({ nullable: true })
  habitualLeftAxis: number;

  @Field({ nullable: true })
  habitualLeftVA: string;

  @Field({ nullable: true })
  habitualLeftAdd: string;

  @Field({ nullable: true })
  dryRetinoscopyRightEyeSphere: number;

  @Field({ nullable: true })
  dryRetinoscopyRightCylinder: number;

  @Field({ nullable: true })
  dryRetinoscopyRightAxis: number;

  @Field({ nullable: true })
  dryRetinoscopyRightVA: string;

  @Field({ nullable: true })
  dryRetinoscopyRightAdd: string;

  @Field({ nullable: true })
  dryRetinoscopyLeftEyeSphere: number;

  @Field({ nullable: true })
  dryRetinoscopyLeftCylinder: number;

  @Field({ nullable: true })
  dryRetinoscopyLeftAxis: number;

  @Field({ nullable: true })
  dryRetinoscopyLeftVA: string;

  @Field({ nullable: true })
  dryRetinoscopyLeftAdd: string;

  @Field({ nullable: true })
  autoRefractionRightEyeSphere: number;

  @Field({ nullable: true })
  autoRefractionRightCylinder: number;

  @Field({ nullable: true })
  autoRefractionRightAxis: number;

  @Field({ nullable: true })
  autoRefractionRightVA: string;

  @Field({ nullable: true })
  autoRefractionRightAdd: string;

  @Field({ nullable: true })
  autoRefractionLeftEyeSphere: number;

  @Field({ nullable: true })
  autoRefractionLeftCylinder: number;

  @Field({ nullable: true })
  autoRefractionLeftAxis: number;

  @Field({ nullable: true })
  autoRefractionLeftVA: string;

  @Field({ nullable: true })
  autoRefractionLeftAdd: string;

  @Field({ nullable: true })
  wetRefractionRightEyeSphere: number;

  @Field({ nullable: true })
  wetRefractionRightCylinder: number;

  @Field({ nullable: true })
  wetRefractionRightAxis: number;

  @Field({ nullable: true })
  wetRefractionRightVA: string;

  @Field({ nullable: true })
  wetRefractionRightAdd: string;

  @Field({ nullable: true })
  wetRefractionLeftEyeSphere: number;

  @Field({ nullable: true })
  wetRefractionLeftCylinder: number;

  @Field({ nullable: true })
  wetRefractionLeftAxis: number;

  @Field({ nullable: true })
  wetRefractionLeftVA: string;

  @Field({ nullable: true })
  wetRefractionLeftAdd: string;

  @Field({ nullable: true })
  subjectiveRefractionRightEyeSphere: number;

  @Field({ nullable: true })
  subjectiveRefractionRightCylinder: number;

  @Field({ nullable: true })
  subjectiveRefractionRightAxis: number;

  @Field({ nullable: true })
  subjectiveRefractionRightVA: string;

  @Field({ nullable: true })
  subjectiveRefractionRightAdd: string;

  @Field({ nullable: true })
  subjectiveRefractionLeftEyeSphere: number;

  @Field({ nullable: true })
  subjectiveRefractionLeftCylinder: number;

  @Field({ nullable: true })
  subjectiveRefractionLeftAxis: number;

  @Field({ nullable: true })
  subjectiveRefractionLeftVA: string;

  @Field({ nullable: true })
  subjectiveRefractionLeftAdd: string;

  @Field({ nullable: true })
  givenRefractionRightEyeSphere: number;

  @Field({ nullable: true })
  givenRefractionRightCylinder: number;

  @Field({ nullable: true })
  givenRefractionRightAxis: number;

  @Field({ nullable: true })
  givenRefractionRightVA: string;

  @Field({ nullable: true })
  givenRefractionRightAdd: string;

  @Field({ nullable: true })
  givenRefractionLeftEyeSphere: number;

  @Field({ nullable: true })
  givenRefractionLeftCylinder: number;

  @Field({ nullable: true })
  givenRefractionLeftAxis: number;

  @Field({ nullable: true })
  givenRefractionLeftVA: string;

  @Field({ nullable: true })
  givenRefractionLeftAdd: string;

  @Field({ nullable: true })
  givenRefractionBVA: string;
}
