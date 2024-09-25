import express, { Response } from "express";
import repos from '../../data/repos.json';
//import type { Repo } from "./repo.type";

const repoControllers = express.Router();

repoControllers.get('/', (_: any, res: Response) => {
  res.status(200).json(repos)
})

export default repoControllers;