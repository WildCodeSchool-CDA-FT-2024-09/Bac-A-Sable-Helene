import express, { Response } from "express";
import langs from "../../data/repos.json";

const langsController = express.Router();

langsController.get('/', (_: any, res: Response) => {
  res.status(200).json(langs)
})


export default langsController;


