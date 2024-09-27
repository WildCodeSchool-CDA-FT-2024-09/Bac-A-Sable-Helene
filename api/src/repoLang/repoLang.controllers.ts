import express, { Request, Response } from "express";
import repoLang from "../../data/repoLang.json";
import type { RepoLang } from "./repoLang.type"

const repoLangsControllers = express.Router();

repoLangsControllers.get('/', (_, res: Response) => {
  res.status(200).json(repoLang)
})

repoLangsControllers.get('/:repo_id', (req: Request, res: Response) => {
  const repoLg = repoLang.find(repLg => repLg.repo_id === req.params.id) as RepoLang;

  if (repoLg) {
    res.status(200).json(repoLg)
  } else {
    res.sendStatus(404)
  }
})

export default repoLangsControllers;