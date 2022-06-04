import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, JoinColumn, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './Department';
import { TypeormLoader } from 'type-graphql-dataloader';
import { User } from './User';

export enum EInstitutionType {
  UNIVERSITY = 'university',
  POLYTECHNIC = 'polytechnic',
  MONOTECHNIC = 'monotechnic',
  COLLEGE = 'college',
}

@ObjectType()
@Entity()
export class School extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column({
    type: 'enum',
    enum: EInstitutionType,
    default: EInstitutionType.UNIVERSITY,
  })
  institutionType: EInstitutionType;

  @OneToMany(() => Department, (department) => department.school)
  @JoinColumn()
  @TypeormLoader()
  departments: Department[];

  @OneToMany(() => User, (user) => user.school)
  @JoinColumn()
  @TypeormLoader()
  students: User[];
}
