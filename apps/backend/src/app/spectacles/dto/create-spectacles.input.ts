import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderStatus } from '../database';

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
@InputType()
export class CreateSpectaclesInput {
  @Field({
    description: 'ID of associated consult',
    nullable: false,
  })
  consultId: string;

  @Field({
    description: 'spectacle code',
    nullable: false,
  })
  code: string;

  @Field({
    description: 'spectacle colour',
    nullable: false,
  })
  colour: string;

  @Field({
    description: 'spectacle lens type',
    nullable: false,
  })
  lensType: string;

  @Field({
    description: 'spectacle PD',
    nullable: false,
  })
  PD: number;

  @Field({
    description: 'spectacle heights',
    nullable: false,
  })
  heights: string;

  @Field({
    description: 'spectacle notes',
    nullable: true,
  })
  notes: string;

  @Field({
    description: 'spectacle order date',
    nullable: true,
  })
  orderDate: Date;

  @Field({
    description: 'spectacle delivered date',
    nullable: true,
  })
  deliveredDate: Date;

  @Field(() => OrderStatus, {
    description: 'spectacle delivery status',
    nullable: false,
  })
  orderStatus: OrderStatus;

  @Field({
    description: 'spectacle delivery school',
    nullable: true,
  })
  deliverySchool: string;
}
