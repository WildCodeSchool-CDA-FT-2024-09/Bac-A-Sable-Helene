import { DataSource } from "typeorm";
import  { Repo }  from "./repos/repo.entities";

export const dataSource = new DataSource ({
  type: "sqlite",
  database: "myDatabase.db",
  entities: [Repo],
  synchronize: true,
});