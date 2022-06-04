import { IsUUID } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile';

export enum AdminRole {
  ADMIN = 'admin',
  SUPERADMIN = 'superAdmin',
}

@ObjectType()
@Entity()
export class Admin extends BaseEntity {
  @IsUUID('4')
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('enum', { enum: AdminRole, default: AdminRole.ADMIN })
  role: AdminRole;

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column('text', { unique: true, nullable: true })
  phoneNumber: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @Column('text', { unique: true, nullable: true })
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @Column({ nullable: true })
  password: string;

  @Column('bool', { default: false })
  confirmed: boolean;
}
