import { IsDate, MaxLength } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from './Department';
import { Faculty } from './Faculty';
import { Profile } from './Profile';
import { School } from './School';

export enum StudentGender {
  MALE = 'male',
  FEMALE = 'female',
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @IsDate()
  @Field({ nullable: true })
  @CreateDateColumn({ name: 'created_date' })
  createdDate?: Date;

  @IsDate()
  @Field({ nullable: true })
  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate?: Date;

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column('text', { unique: true, nullable: true })
  phoneNumber: string;

  @Field()
  @Column('enum', { enum: StudentGender, nullable: true })
  gender: StudentGender;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @MaxLength(100)
  @Column('text', { unique: true, nullable: true })
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  @TypeormLoader()
  profile: Profile;

  @ManyToOne(() => School, (school) => school.students)
  @JoinColumn()
  @TypeormLoader()
  school: School;

  @ManyToOne(() => Department, (department) => department.students)
  @JoinColumn()
  @TypeormLoader()
  department: School;

  @ManyToOne(() => Faculty, (faculty) => faculty.students)
  @JoinColumn()
  @TypeormLoader()
  faculty: Faculty;

  @Column({ nullable: true })
  password: string;

  @Column('bool', { default: false })
  confirmed: boolean;

  @Column('bool', { default: false })
  hasReceivedAirtime: boolean;

  // @RelationId((faculty: Faculty) => faculty.students)
  // facultyId: string;

  // @RelationId((school: School) => school.students)
  // schoolId: string;

  // @RelationId((department: Department) => department.students)
  // departmentId: string;
}
