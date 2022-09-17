import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UpdateConsultInput } from './update-consult.input';

@InputType()
export class SetConsultInput extends PartialType(UpdateConsultInput) {
  @Field(() => String, { nullable: false })
  id: string;

  @Field({ nullable: true })
  deletedAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
