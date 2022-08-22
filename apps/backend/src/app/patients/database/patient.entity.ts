import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@supervision/shared';

@Entity({ name: 'patient' })
export class PatientEntity extends BaseEntity {}
