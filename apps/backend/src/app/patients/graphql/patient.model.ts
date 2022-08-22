import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '@supervision/shared';

@ObjectType({ description: 'patient' })
export class PatientModel extends BaseModel {}
