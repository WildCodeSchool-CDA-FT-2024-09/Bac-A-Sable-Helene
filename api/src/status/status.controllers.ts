import express, { Response } from "express";
import status from '../../data/status.json';

const statusControllers = express.Router();

statusControllers.get('/', (_, res: Response) => {
  res.status(200).json(status)
})

export default statusControllers;