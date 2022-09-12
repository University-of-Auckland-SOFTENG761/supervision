import { InputType, Field } from '@nestjs/graphql';
import { SetPatientInput } from './set-patient-input';

@InputType()
export class SetPatientsInput {
  @Field(() => [SetPatientInput], { nullable: true })
  setPatientInputs: SetPatientInput[];
}
