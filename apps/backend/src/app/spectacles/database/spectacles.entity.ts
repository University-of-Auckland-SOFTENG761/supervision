import { BaseEntity } from '@supervision/shared';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { PatientEntity } from '@supervision/patients/database/patient.entity';
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

  @ManyToOne(() => PatientEntity, (patient) => patient.spectacles)
  patient: PatientEntity;

  @Column('varchar', { nullable: true })
  code: string;

  @Column('varchar', { length: 22, nullable: true })
  colour: string;

  @Column('varchar', { length: 20, nullable: true })
  lensType: string;

  // PD: Pupil distance
  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  PD: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  heights: string;

  @Column('varchar', { nullable: true })
  notes: string;

  @Column('date', { nullable: true })
  orderDate: Date;

  @Column('date', { nullable: true })
  deliveredDate: Date;

  @Column('enum', {
    enum: OrderStatus,
    nullable: true,
    default: OrderStatus.SENT,
  })
  orderStatus: OrderStatus;

  @Column('varchar', { length: 45, nullable: true })
  deliverySchool: string;
}
