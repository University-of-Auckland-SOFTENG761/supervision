import { BaseEntity } from '@supervision/shared';
import { Column, Entity } from 'typeorm';

export enum Ethnicity {
  NZEUROPEAN = 'nz european',
  OTHEREUROPEAN = 'other european',
  NZMAORI = 'nz maori',
  SAMOAN = 'samoan',
  COOKISLANDMAORI = 'cook island maori',
  TONGAN = 'tongan',
  NUIEAN = 'niuean',
  TOKELAUAN = 'tokelauan',
  FIJIAN = 'fijian',
  OTHERPACIFICISLAND = 'other pacific island',
  SOUTHEASTASIAN = 'south east asian',
  CHINESE = 'chinese',
  INDIAN = 'indian',
  OTHERASIAN = 'other asian',
  MIDDLEEASTERN = 'middle eastern',
  LATINAMERICANHISPANIC = 'latin america hispanic',
  AFRICAN = 'african',
  OTHERETHNICITY = 'other ethnicity',
}

export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
  OTHER = 'other',
  PREFERNOTTOSAY = 'prefer not to say',
}

@Entity({ name: 'patient' })
export class PatientEntity extends BaseEntity {
  @Column('varchar', { length: 40 })
  firstName: string;

  @Column('varchar', { length: 40 })
  lastName: string;

  @Column('date')
  dateOfBirth: Date;

  @Column('enum', {
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column('enum', {
    enum: Ethnicity,
    nullable: true,
  })
  ethnicity: Ethnicity;

  @Column('varchar', {
    length: 45,
    nullable: true,
  })
  school: string;

  @Column('smallint', { nullable: true })
  yearLevel: number;

  @Column('date', { nullable: true })
  yearLevelLastUpdated: Date;

  @Column('varchar', { length: 20, nullable: true })
  room: string;

  @Column('varchar', { length: 40, nullable: true })
  caregiverFirstName: string;

  @Column('varchar', { length: 40, nullable: true })
  caregiverLastName: string;

  @Column('varchar', { length: 15, nullable: true })
  phoneNumber: string;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('varchar', { nullable: true })
  streetAddress: string;

  @Column('varchar', { nullable: true })
  suburb: string;

  @Column('varchar', { nullable: true })
  city: string;

  @Column('varchar', { length: 5, nullable: true })
  postcode: string;

  @Column('varchar', { array: true, nullable: true })
  recalls: [string];

  @Column('varchar', { nullable: true })
  adminNotes: string;

  @Column('varchar', { nullable: true })
  screeningList: string;
}
