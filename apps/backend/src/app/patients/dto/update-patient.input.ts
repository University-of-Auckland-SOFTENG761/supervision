import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePatientInput } from './create-patient.input';

@InputType()
export class UpdatePatientInput extends PartialType(CreatePatientInput) {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => [String])
  consultIds: string[];
}
