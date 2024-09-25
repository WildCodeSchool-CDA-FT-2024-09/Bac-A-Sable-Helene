import express, { Response } from "express";
import repoLang from "../../data/repoLang.json";

const repoLangControllers = express.Router();

repoLangControllers.get('/', (_, res: Response) => {
  res.status(200).json(repoLang)
})

export default repoLangControllers;