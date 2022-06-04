import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  Column,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { TypeormLoader } from 'type-graphql-dataloader';
import { PastQuestion } from './PastQuestions';
import { School } from './School';
import { User } from './User';
import { IsUUID } from 'class-validator';
import { Faculty } from './Faculty';

@ObjectType()
@Entity()
export class Department extends BaseEntity {
  @IsUUID('4')
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => School, (school) => school.departments)
  @JoinColumn()
  @TypeormLoader()
  school: School;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.department)
  @TypeormLoader()
  students: User;

  @ManyToOne(() => Faculty, (faculty) => faculty.departments)
  @JoinColumn()
  @TypeormLoader()
  faculty: Faculty[];

  @Field(() => [PastQuestion])
  @OneToMany(() => PastQuestion, (pastQuestions) => pastQuestions.department)
  @TypeormLoader()
  pastQuestions: PastQuestion[];
}
