import { Field, ObjectType } from '@nestjs/graphql';
import { ConsultModel } from '@supervision/consults';
import { PatientModel } from '@supervision/patients';
import { BaseModel } from '@supervision/shared';
import { OrderStatus } from '../database';

@ObjectType({ description: 'spectacle' })
export class SpectacleModel extends BaseModel {
  @Field(() => ConsultModel, { nullable: false })
  consult: ConsultModel;

  @Field(() => PatientModel, { nullable: false })
  patient: PatientModel;

  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  colour: string;

  @Field({ nullable: true })
  lensType: string;

  @Field({ nullable: true })
  PD: number;

  @Field({ nullable: true })
  heights: string;

  @Field({ nullable: true })
  notes: string;

  @Field({ nullable: true })
  orderDate: Date;

  @Field({ nullable: true })
  createdDate: Date;

  @Field({ nullable: true })
  deliveredDate: Date;

  @Field(() => OrderStatus, { nullable: true })
  orderStatus: OrderStatus;

  @Field({ nullable: true })
  deliverySchool: string;
}
