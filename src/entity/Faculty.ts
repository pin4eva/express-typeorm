import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, JoinColumn, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './Department';
import { TypeormLoader } from 'type-graphql-dataloader';
import { User } from './User';

@ObjectType()
@Entity()
export class Faculty extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.faculty)
  @JoinColumn()
  @TypeormLoader()
  students: User[];

  @OneToMany(() => Department, (department) => department.faculty)
  @JoinColumn()
  @TypeormLoader()
  departments: Department[];
}
