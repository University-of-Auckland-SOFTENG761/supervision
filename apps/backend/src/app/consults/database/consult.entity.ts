import { BaseEntity } from '@supervision/shared';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'consult' })
export class ConsultEntity extends BaseEntity {
  @Column('varchar', { length: 140 })
  history: string;

  @Column('varchar', { length: 8, nullable: true })
  visualAcuityLeft: string;

  @Column('varchar', { length: 8, nullable: true })
  visualAcuityRight: string;

  @Column('varchar', { length: 8, nullable: true })
  visualAcuityBoth: string;

  @Column('varchar', { length: 8, nullable: true })
  nearAcuityLeft: string;

  @Column('varchar', { length: 8, nullable: true })
  nearAcuityRight: string;

  @Column('varchar', { length: 8, nullable: true })
  nearAcuityBoth: string;

  @Column('int', { nullable: true })
  coverTestDistance: number;

  @Column('int', { nullable: true })
  coverTestNear: number;

  @Column('varchar', { length: 40, nullable: true })
  medication: string;

  @Column('varchar', { length: 8, nullable: true })
  nearPointOfConvergence: string;

  @Column('varchar', { length: 8, nullable: true })
  motility: string;

  @Column('varchar', { length: 8, nullable: true })
  pupils: string;

  @Column('int', { nullable: true })
  pupillaryDistance: number;

  @Column('varchar', { length: 20, nullable: true })
  other: string;

  @Column('int', { nullable: true })
  eyePressureLeft: number;

  @Column('date', { nullable: true })
  eyePressureLeftTimestamp: Date;

  @Column('int', { nullable: true })
  eyePressureRight: number;

  @Column('date', { nullable: true })
  eyePressureRightTimestamp: Date;

  @Column('boolean', { nullable: true })
  isCyclopentolate: boolean;

  @Column('boolean', { nullable: true })
  isTropicamide: boolean;

  @Column('varchar', { length: 20, nullable: true })
  binocularVision: string;

  @Column('varchar', { length: 20, nullable: true })
  anteriorHealth: string;

  @Column('varchar', { length: 20, nullable: true })
  posteriorHealth: string;

  @Column('varchar', { length: 140, nullable: true })
  diagnosis: string;

  @Column('varchar', { length: 140, nullable: true })
  management: string;

  @Column('varchar', { length: 280, nullable: true })
  layPersonNotes: string;

  @Column('varchar', { length: 20, nullable: true })
  spectacleCode: string;

  @Column('varchar', { length: 20, nullable: true })
  spectacleColour: string;

  @Column('varchar', { length: 20, nullable: true })
  spectacleLensType: string;

  @Column('varchar', { length: 20, nullable: true })
  spectacleHeights: string;

  @Column('varchar', { length: 140, nullable: true })
  spectacleNotes: string;

  // NEED TO CHECK TYPES WITH VEERAN
  // SHOULD THESE BE ARRAYS OR SOMETHING?

  @Column('int', { nullable: true })
  prevSpecRxGivenRightEyeSphere: number;

  @Column('int', { nullable: true })
  prevSpecRxGivenRightCylinder: number;

  @Column('int', { nullable: true })
  prevSpecRxGivenRightAxis: number;

  @Column('int', { nullable: true })
  prevSpecRxGivenRightVA: number;

  @Column('int', { nullable: true })
  prevSpecRxGivenLeftEyeSphere: number;

  @Column('int', { nullable: true })
  prevSpecRxGivenLeftCylinder: number;

  @Column('int', { nullable: true })
  prevSpecRxGivenLeftAxis: number;

  @Column('int', { nullable: true })
  prevSpecRxGivenLeftVA: number;

  @Column('int', { nullable: true })
  habitualRightEyeSphere: number;

  @Column('int', { nullable: true })
  habitualRightCylinder: number;

  @Column('int', { nullable: true })
  habitualRightAxis: number;

  @Column('int', { nullable: true })
  habitualRightVA: number;

  @Column('int', { nullable: true })
  habitualLeftEyeSphere: number;

  @Column('int', { nullable: true })
  habitualLeftCylinder: number;

  @Column('int', { nullable: true })
  habitualLeftAxis: number;

  @Column('int', { nullable: true })
  habitualLeftVA: number;

  @Column('int', { nullable: true })
  dryRetinoscopyRightEyeSphere: number;

  @Column('int', { nullable: true })
  dryRetinoscopyRightCylinder: number;

  @Column('int', { nullable: true })
  dryRetinoscopyRightAxis: number;

  @Column('int', { nullable: true })
  dryRetinoscopyRightVA: number;

  @Column('int', { nullable: true })
  dryRetinoscopyLeftEyeSphere: number;

  @Column('int', { nullable: true })
  dryRetinoscopyLeftCylinder: number;

  @Column('int', { nullable: true })
  dryRetinoscopyLeftAxis: number;

  @Column('int', { nullable: true })
  dryRetinoscopyLeftVA: number;

  @Column('int', { nullable: true })
  autoRefractionRightEyeSphere: number;

  @Column('int', { nullable: true })
  autoRefractionRightCylinder: number;

  @Column('int', { nullable: true })
  autoRefractionRightAxis: number;

  @Column('int', { nullable: true })
  autoRefractionRightVA: number;

  @Column('int', { nullable: true })
  autoRefractionLeftEyeSphere: number;

  @Column('int', { nullable: true })
  autoRefractionLeftCylinder: number;

  @Column('int', { nullable: true })
  autoRefractionLeftAxis: number;

  @Column('int', { nullable: true })
  autoRefractionLeftVA: number;

  @Column('int', { nullable: true })
  wetRefractionRightEyeSphere: number;

  @Column('int', { nullable: true })
  wetRefractionRightCylinder: number;

  @Column('int', { nullable: true })
  wetRefractionRightAxis: number;

  @Column('int', { nullable: true })
  wetRefractionRightVA: number;

  @Column('int', { nullable: true })
  wetRefractionLeftEyeSphere: number;

  @Column('int', { nullable: true })
  wetRefractionLeftCylinder: number;

  @Column('int', { nullable: true })
  wetRefractionLeftAxis: number;

  @Column('int', { nullable: true })
  wetRefractionLeftVA: number;

  @Column('int', { nullable: true })
  subjectiveRefractionRightEyeSphere: number;

  @Column('int', { nullable: true })
  subjectiveRefractionRightCylinder: number;

  @Column('int', { nullable: true })
  subjectiveRefractionRightAxis: number;

  @Column('int', { nullable: true })
  subjectiveRefractionRightVA: number;

  @Column('int', { nullable: true })
  subjectiveRefractionLeftEyeSphere: number;

  @Column('int', { nullable: true })
  subjectiveRefractionLeftCylinder: number;

  @Column('int', { nullable: true })
  subjectiveRefractionLeftAxis: number;

  @Column('int', { nullable: true })
  subjectiveRefractionLeftVA: number;

  @Column('int', { nullable: true })
  givenRefractionRightEyeSphere: number;

  @Column('int', { nullable: true })
  givenRefractionRightCylinder: number;

  @Column('int', { nullable: true })
  givenRefractionRightAxis: number;

  @Column('int', { nullable: true })
  givenRefractionRightVA: number;

  @Column('int', { nullable: true })
  givenRefractionLeftEyeSphere: number;

  @Column('int', { nullable: true })
  givenRefractionLeftCylinder: number;

  @Column('int', { nullable: true })
  givenRefractionLeftAxis: number;

  @Column('int', { nullable: true })
  givenRefractionLeftVA: number;
}
