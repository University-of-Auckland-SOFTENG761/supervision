import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@supervision/shared';

@ObjectType({ description: 'patient' })
export class PatientModel extends BaseModel {
  @Field({ nullable: false })
  history: string;
}
