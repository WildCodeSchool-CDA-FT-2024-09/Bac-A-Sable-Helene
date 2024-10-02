import "reflect-metadata";
import { Repo } from '../repos/repo.entities';
import { IsString } from "class-validator";

import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";

@Entity()
export class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  @IsString()
  name : string;

  @ManyToMany(() => Repo, (repo) => repo.languages, { onDelete: "CASCADE" }) // repo.languages cad va chercher les langages pour un repo
  repos?: Repo[]

  }