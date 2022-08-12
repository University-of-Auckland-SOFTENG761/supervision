import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@supervision/entities';

export enum UserRole {
  SUPERVISOR = 'supervisor',
  STUDENT = 'student',
}

@Entity()
export default class User extends BaseEntity {
  @Column('varchar', { length: 30 })
  firstName: string;

  @Column('varchar', { length: 30 })
  lastName: string;

  @Column('enum', {
    enum: UserRole,
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;
}
