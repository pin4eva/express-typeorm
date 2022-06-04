import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Department } from './Department';
import { TypeormLoader } from 'type-graphql-dataloader';
import { IsUUID } from 'class-validator';

export enum ELevel {
  YEAR_ONE = 1,
  YEAR_TWO = 2,
  YEAR_THREE = 3,
  YEAR_FOUR = 4,
  YEAR_FIVE = 5,
  YEAR_SIX = 6,
}

@ObjectType()
@Entity()
export class PastQuestion extends BaseEntity {
  @IsUUID('4')
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  question: string;

  @Field()
  @Column()
  solutions: string;

  @Field()
  @Column()
  course: string;

  @Field()
  @Column('text', { nullable: true })
  image: string;

  @Field()
  @Column({ type: 'enum', enum: ELevel })
  level: number;

  @Field(() => Department)
  @ManyToOne(() => Department, (department) => department.pastQuestions)
  @TypeormLoader()
  department: Department;
}
