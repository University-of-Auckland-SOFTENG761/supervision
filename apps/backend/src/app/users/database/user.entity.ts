import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@supervision/shared';
import { ConsultEntity } from '@supervision/consults/database/consult.entity';
import { SpectacleEntity } from '@supervision/spectacle/database/spectacle.entity';

export enum UserRole {
  SUPERVISOR = 'supervisor',
  STUDENT = 'student',
}

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column('text', { nullable: false, unique: true })
  auth0Id: string;

  @Column('varchar', { nullable: true })
  email: string;

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

  @OneToMany(() => ConsultEntity, (consult) => consult.user, {
    cascade: ['insert', 'update'],
  })
  consults: ConsultEntity[];

  @OneToMany(() => SpectacleEntity, (spectacle) => spectacle.patient)
  spectacle: SpectacleEntity[];
}
