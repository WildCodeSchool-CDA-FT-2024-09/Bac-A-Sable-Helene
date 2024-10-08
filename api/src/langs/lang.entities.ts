import "reflect-metadata";
import { Repo } from '../repos/repo.entities';
import { IsString } from "class-validator";

import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";
import { Field, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class Lang extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id : number;

  @Field()
  @Column()
  @IsString()
  name : string;

  @Field(() => [Repo])
  @ManyToMany(() => Repo, (repo) => repo.languages, { onDelete: "CASCADE" }) // repo.languages cad va chercher les langages pour un repo
  repos?: Repo[]

  }