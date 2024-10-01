import "reflect-metadata";
import { Repo } from "../repos/repo.entities"
import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";

@Entity()
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id : string;

  @Column()
  label : string;

 @OneToMany(() => Repo , repo => repo.status)
  repos?: Repo[]

}