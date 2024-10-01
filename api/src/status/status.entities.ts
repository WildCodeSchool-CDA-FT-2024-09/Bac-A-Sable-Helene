import "reflect-metadata";
import { Repo } from "../repos/repo.entities";
import { IsString } from "class-validator";
import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";

@Entity()
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  @IsString()
  label : string;

 @OneToMany(() => Repo , repo => repo.status)
  repos?: Repo[]

}