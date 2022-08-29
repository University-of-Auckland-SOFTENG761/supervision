import { BaseEntity } from '@supervision/shared';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'consult' })
export class ConsultEntity extends BaseEntity {
  @Column('varchar', { length: 40 })
  history: string;
}
