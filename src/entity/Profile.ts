import { IsDate, IsEmpty, IsUUID } from 'class-validator';
import { Field, ID } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { TypeormLoader } from 'type-graphql-dataloader';

export enum UserGender {
  MALE = 'Male',
  FEMALE = 'Female',
}

@Entity()
export class Profile {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsEmpty()
  @IsUUID('4')
  id: string;

  @IsDate()
  @Field({ nullable: false })
  @CreateDateColumn({ name: 'created_date' })
  createdDate?: Date;

  @IsDate()
  @Field({ nullable: false })
  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate?: Date;

  @Column('enum', { enum: UserGender })
  gender: string;

  @Column()
  photo: string;

  @OneToOne(() => User, (user) => user.profile, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @TypeormLoader()
  user: User;
}
