import "reflect-metadata";
import { Min, Max, IsString } from "class-validator";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";
import {
  BaseEntity,
  Column, Entity,
  PrimaryColumn,
  ManyToOne, ManyToMany, JoinTable
} from "typeorm";

@Entity()
export class Repo extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  id : string;

  @Column()
  @IsString()
  name : string;

  @Column()
  @IsString()
  url : string;

  @ManyToOne(() => Status, status => status.id, {cascade: true})
  @Min(1)
  @Max(2)
  status : Status;

  @ManyToMany(()=> Lang, (lang)=> lang.repos, {cascade: true})
  @JoinTable()
  languages: Lang[]

  }