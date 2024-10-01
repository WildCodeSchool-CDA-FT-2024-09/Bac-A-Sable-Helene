import { DataSource } from "typeorm";

import  { Repo }  from "../repos/repo.entities";
import { Status } from '../status/status.entities';

export const dataSource = new DataSource ({
  type: "sqlite",
  database: "./src/db/myDatabase.db",
  entities: [Repo, Status],
  synchronize: true,
});