import { Field, ObjectType } from '@nestjs/graphql';
import { ConsultModel } from '@supervision/consults';
import { PatientModel } from '@supervision/patients';
import { BaseModel } from '@supervision/shared';
import { OrderStatus } from '../database';

@ObjectType({ description: 'spectacles' })
export class SpectaclesModel extends BaseModel {
  @Field(() => ConsultModel, { nullable: false })
  consult: ConsultModel;

  @Field(() => PatientModel, { nullable: false })
  patient: PatientModel;

  @Field({ nullable: false })
  code: string;

  @Field({ nullable: false })
  colour: string;

  @Field({ nullable: false })
  lensType: string;

  @Field({ nullable: false })
  PD: number;

  @Field({ nullable: false })
  heights: string;

  @Field({ nullable: true })
  notes: string;

  @Field({ nullable: true })
  orderDate: Date;

  @Field({ nullable: true })
  createdDate;

  @Field({ nullable: true })
  deliveredDate: Date;

  @Field(() => OrderStatus, { nullable: false })
  orderStatus: OrderStatus;

  @Field({ nullable: true })
  deliverySchool: string;
}
