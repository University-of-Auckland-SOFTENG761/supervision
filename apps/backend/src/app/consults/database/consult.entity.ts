import { BaseEntity } from '@supervision/shared';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { UserEntity } from '@supervision/users/database/user.entity';
import { PatientEntity } from '@supervision/patients/database/patient.entity';

@Entity({ name: 'consult' })
export class ConsultEntity extends BaseEntity {
  @JoinTable()
  @ManyToOne(() => UserEntity, (user) => user.consults, {
    nullable: false,
    eager: true,
  })
  user: UserEntity;

  @ManyToOne(() => PatientEntity, (patient) => patient.consults, {
    nullable: false,
    eager: true,
  })
  @JoinTable()
  patient: PatientEntity;

  @Column('date', { nullable: true })
  dateConsentGiven: Date;

  @Column('varchar', { nullable: true })
  history: string;

  @Column('varchar', { nullable: true })
  medication: string;

  @Column('varchar', { length: 10, nullable: true })
  visualAcuityLeft: string;

  @Column('varchar', { length: 10, nullable: true })
  visualAcuityRight: string;

  @Column('varchar', { length: 10, nullable: true })
  visualAcuityBoth: string;

  @Column('varchar', { length: 10, nullable: true })
  nearAcuityLeft: string;

  @Column('varchar', { length: 10, nullable: true })
  nearAcuityRight: string;

  @Column('varchar', { length: 10, nullable: true })
  nearAcuityBoth: string;

  @Column('varchar', { length: 40, nullable: true })
  coverTestDistance: string;

  @Column('varchar', { length: 40, nullable: true })
  coverTestNear: string;

  @Column('varchar', { length: 8, nullable: true })
  nearPointOfConvergence: string;

  @Column('varchar', { length: 8, nullable: true })
  motility: string;

  @Column('varchar', { length: 8, nullable: true })
  pupils: string;

  @Column('smallint', { nullable: true })
  pupillaryDistance: number;

  @Column('varchar', { length: 20, nullable: true })
  otherField: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  eyePressureLeft: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  eyePressureRight: number;

  @Column('date', { nullable: true })
  eyePressureTimestamp: Date;

  @Column('boolean', { nullable: true })
  isCyclopentolate: boolean;

  @Column('date', { nullable: true })
  cyclopentolateTimestamp: Date;

  @Column('boolean', { nullable: true })
  isTropicamide: boolean;

  @Column('date', { nullable: true })
  tropicamideTimestamp: Date;

  @Column('varchar', { nullable: true })
  binocularVision: string;

  @Column('varchar', { nullable: true })
  anteriorHealth: string;

  @Column('varchar', { nullable: true })
  posteriorHealth: string;

  @Column('varchar', { nullable: true })
  diagnosis: string;

  @Column('varchar', { nullable: true })
  management: string;

  @Column('varchar', { nullable: true })
  layPersonNotes: string;

  @Column('varchar', { length: 20, nullable: true })
  spectacleCode: string;

  @Column('varchar', { length: 20, nullable: true })
  spectacleColour: string;

  @Column('varchar', { length: 20, nullable: true })
  spectacleLensType: string;

  @Column('varchar', { length: 20, nullable: true, default: 'Datum' })
  spectacleHeights: string;

  @Column('varchar', { nullable: true })
  spectacleNotes: string;

  // RECALL COULD BE SUBJECT TO CHANGE
  @Column('date', { nullable: true })
  recallDate: Date;

  @Column('varchar', { nullable: true })
  recallDescription: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  prevSpecRxGivenRightEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  prevSpecRxGivenRightCylinder: number;

  @Column('smallint', { nullable: true })
  prevSpecRxGivenRightAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  prevSpecRxGivenRightVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  prevSpecRxGivenRightAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  prevSpecRxGivenLeftEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  prevSpecRxGivenLeftCylinder: number;

  @Column('smallint', { nullable: true })
  prevSpecRxGivenLeftAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  prevSpecRxGivenLeftVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  prevSpecRxGivenLeftAdd: number;

  @Column('varchar', { length: 10, nullable: true })
  prevSpecRxGivenBVA: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  habitualRightEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  habitualRightCylinder: number;

  @Column('smallint', { nullable: true })
  habitualRightAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  habitualRightVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  habitualRightAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  habitualLeftEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  habitualLeftCylinder: number;

  @Column('smallint', { nullable: true })
  habitualLeftAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  habitualLeftVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  habitualLeftAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  dryRetinoscopyRightEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  dryRetinoscopyRightCylinder: number;

  @Column('smallint', { nullable: true })
  dryRetinoscopyRightAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  dryRetinoscopyRightVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  dryRetinoscopyRightAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  dryRetinoscopyLeftEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  dryRetinoscopyLeftCylinder: number;

  @Column('smallint', { nullable: true })
  dryRetinoscopyLeftAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  dryRetinoscopyLeftVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  dryRetinoscopyLeftAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  autoRefractionRightEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  autoRefractionRightCylinder: number;

  @Column('smallint', { nullable: true })
  autoRefractionRightAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  autoRefractionRightVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  autoRefractionRightAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  autoRefractionLeftEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  autoRefractionLeftCylinder: number;

  @Column('smallint', { nullable: true })
  autoRefractionLeftAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  autoRefractionLeftVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  autoRefractionLeftAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  wetRefractionRightEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  wetRefractionRightCylinder: number;

  @Column('smallint', { nullable: true })
  wetRefractionRightAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  wetRefractionRightVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  wetRefractionRightAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  wetRefractionLeftEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  wetRefractionLeftCylinder: number;

  @Column('smallint', { nullable: true })
  wetRefractionLeftAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  wetRefractionLeftVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  wetRefractionLeftAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  subjectiveRefractionRightEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  subjectiveRefractionRightCylinder: number;

  @Column('smallint', { nullable: true })
  subjectiveRefractionRightAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  subjectiveRefractionRightVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  subjectiveRefractionRightAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  subjectiveRefractionLeftEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  subjectiveRefractionLeftCylinder: number;

  @Column('smallint', { nullable: true })
  subjectiveRefractionLeftAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  subjectiveRefractionLeftVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  subjectiveRefractionLeftAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  givenRefractionRightEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  givenRefractionRightCylinder: number;

  @Column('smallint', { nullable: true })
  givenRefractionRightAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  givenRefractionRightVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  givenRefractionRightAdd: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  givenRefractionLeftEyeSphere: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  givenRefractionLeftCylinder: number;

  @Column('smallint', { nullable: true })
  givenRefractionLeftAxis: number;

  @Column('varchar', { length: 10, nullable: true })
  givenRefractionLeftVA: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  givenRefractionLeftAdd: number;

  @Column('varchar', { length: 10, nullable: true })
  givenRefractionBVA: string;
}
