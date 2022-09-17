import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateConsultInput } from './create-consult.input';

@InputType()
export class UpdateConsultInput extends PartialType(CreateConsultInput) {
  @Field(() => String, { nullable: false })
  id: string;
}
