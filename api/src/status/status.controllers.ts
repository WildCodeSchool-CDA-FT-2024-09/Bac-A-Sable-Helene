import express, { Request, Response } from "express";
import { Status } from "./status.entities";
const statusControllers = express.Router();
import { validate } from "class-validator";

statusControllers.get('/', async (_, res: Response) => {
  try {
    const status = await Status.find( {
      relations : {
        repos: true
      }
    });
    res.status(200).json(status)
  } catch (error) {
    res.sendStatus(500)
  }
})

statusControllers.post('/',async  (req: Request, res: Response) => {
  try {
    const status = new Status();
    status.label = req.body.label;

    const error = await validate(status)
    if (error.length > 0) {
      res.status(422).json(error)
    } else {
    await status.save();
    res.status(201).json(status)
    }
  } catch  (error) {
  res.sendStatus(500)
  }
})

export default statusControllers;