import { BaseEntity } from '@supervision/shared';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { PatientEntity } from '@supervision/patients/database/patient.entity';
import { ConsultEntity } from '@supervision/consults/database/consult.entity';

export enum OrderStatus {
  CREATED = 'created',
  ORDERSENT = 'orderSent',
  READYFORDELIVERY = 'readyForDelivery',
  DELIVERED = 'delivered',
}

export enum LensType {
  SINGLEVISIONDISTANCE = 'singleVisionDistance',
  SINGLEVISIONNEAR = 'singleVisionNear',
  MULTIFOCAL = 'multifocal',
  OCCUPATIONALS = 'occupationals',
  BIFOCALS = 'bifocals',
}

@Entity({ name: 'spectacle' })
export class SpectacleEntity extends BaseEntity {
  @OneToOne(() => ConsultEntity, (consult) => consult.spectacle)
  consult: ConsultEntity;

  @ManyToOne(() => PatientEntity, (patient) => patient.spectacle)
  patient: PatientEntity;

  @Column('varchar', { nullable: true })
  code: string;

  @Column('varchar', { length: 22, nullable: true })
  colour: string;

  @Column('enum', {
    enum: LensType,
    nullable: true,
  })
  lensType: LensType;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  pupillaryDistance: number;

  @Column({ nullable: true })
  heights: string;

  @Column('varchar', { nullable: true })
  notes: string;

  @Column('timestamp', { nullable: true })
  createdDate: Date;

  @Column('timestamp', { nullable: true })
  orderDate: Date;

  @Column('timestamp', { nullable: true })
  deliveredDate: Date;

  @Column('enum', {
    enum: OrderStatus,
    nullable: true,
    default: OrderStatus.CREATED,
  })
  orderStatus: OrderStatus;

  @Column('varchar', { length: 45, nullable: true })
  deliverySchool: string;
}
