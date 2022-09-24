import { Field, ObjectType } from '@nestjs/graphql';
import { PatientModel } from '@supervision/patients';
import { BaseModel } from '@supervision/shared';
import { UserModel } from '@supervision/users';
import { OrderStatus } from '../database';

@ObjectType({ description: 'spectacle' })
export class SpectacleModel extends BaseModel {
  @Field(() => SpectacleModel, { nullable: true })
  spectacle: SpectacleModel;

  @Field(() => PatientModel, { nullable: false })
  patient: PatientModel;

  @Field(() => UserModel, { nullable: false })
  user: UserModel;

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
  deliveredDate: Date;

  @Field(() => OrderStatus, { nullable: false })
  deliveryStatus: OrderStatus;

  @Field({ nullable: true })
  deliverySchool: string;
}
