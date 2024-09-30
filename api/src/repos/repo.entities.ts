import "reflect-metadata";
import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Repo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id : string;

  @Column()
  name : string;

  @Column()
  url : string;

  @Column()
  isPrivate : number;

  }