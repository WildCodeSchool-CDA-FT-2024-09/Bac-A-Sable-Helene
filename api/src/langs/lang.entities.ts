import "reflect-metadata";
import { Repo } from '../repos/repo.entities';
import { IsString, IsNumber } from "class-validator";

import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";

@Entity()
export class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id : number;

  @Column()
  @IsString()
  name : string;

  @ManyToMany(() => Repo, (repo) => repo.languages)
  repos: Repo[]

  }