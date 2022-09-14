import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UpdatePatientInput } from './update-patient.input';

@InputType()
export class SetPatientInput extends PartialType(UpdatePatientInput) {
  // TODO: add field descriptions
  @Field(() => String, { nullable: false })
  id: string;

  @Field({ nullable: true })
  deletedAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
