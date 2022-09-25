import { BaseEntity } from '@supervision/shared';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { PatientEntity } from '@supervision/patients/database/patient.entity';
import { UserEntity } from '@supervision/users/database/user.entity';
import { ConsultEntity } from '@supervision/consults/database/consult.entity';

export enum OrderStatus {
  SENT = 'orderSent',
  READY = 'readyForDelivery',
  DELIVERED = 'deliveredToPatient',
}

@Entity({ name: 'spectacles' })
export class SpectaclesEntity extends BaseEntity {
  @OneToOne(() => ConsultEntity, (consult) => consult.spectacles)
  consult: ConsultEntity;

  // TODO: Do we want to associate a supervisor or student with a spectacle order? i.e. this supervisor needs to oversee all these specs
  @ManyToOne(() => UserEntity, (user) => user.spectacles)
  user: UserEntity;

  @ManyToOne(() => PatientEntity, (patient) => patient.spectacles)
  patient: PatientEntity;

  @Column('varchar', {
    length: 50, // ? Do we want to limit the length of the code?
    nullable: false,
  })
  code: string; // Might need to change to accomodate for drop down list functionality PO wants

  @Column('varchar', { length: 22, nullable: false })
  colour: string;

  @Column('varchar', { length: 20, nullable: false })
  lensType: string;

  // PD: Pupil distance
  @Column('smallint', { nullable: false })
  PD: number;

  @Column('varchar', { nullable: false })
  heights: string;

  @Column('varchar', { nullable: true })
  notes: string;

  @Column('date', { nullable: true })
  orderDate: Date;

  @Column('date', { nullable: true })
  deliveredDate: Date;

  @Column('enum', {
    enum: OrderStatus,
    nullable: false,
  })
  orderStatus: OrderStatus;

  @Column('varchar', { length: 45, nullable: true })
  deliverySchool: string;
}
