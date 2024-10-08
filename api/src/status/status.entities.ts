import "reflect-metadata";
import { Repo } from "../repos/repo.entities";
import { IsString } from "class-validator";
import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { Field, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class Status extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id : number;

  @Field()
  @Column()
  @IsString()
  label : string;

  @Field(() => [Repo])
  @OneToMany(() => Repo , repo => repo.status)
  repos?: Repo[]

}