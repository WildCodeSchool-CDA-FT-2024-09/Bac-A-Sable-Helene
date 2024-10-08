import "reflect-metadata";
import { IsString, IsBoolean } from "class-validator";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";
import {
  BaseEntity,
  Column, Entity,
  PrimaryColumn,
  ManyToOne, ManyToMany, JoinTable
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Repo extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  @IsString()
  id : string;

  @Field()
  @Column()
  @IsString()
  name : string;

  @Field()
  @Column()
  @IsString()
  url : string;

  @Field()
  @Column({ default: () => false })
  @IsBoolean()
  isFavorite: boolean;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.id)
  status: Status;

  @Field(() => [Lang])
  @ManyToMany(()=> Lang, (lang)=> lang.repos, {cascade: true})
  @JoinTable()
  languages?: Lang[];
}

@ObjectType()
export class LightRepo extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field()
  isFavorite: boolean;
 }