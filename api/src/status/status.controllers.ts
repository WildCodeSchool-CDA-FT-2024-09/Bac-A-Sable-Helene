import express, { Request, Response, NextFunction } from "express";
import status from '../../data/status.json';
import Joi from "joi";

const statusControllers = express.Router();

const schema = Joi.object({
  id: Joi.number().required(),
  label: Joi.string().required(),
})


const validateStatus = (req: Request, res: Response, next: NextFunction)=> {
  const { error } = schema.validate(req.body)
  if (error == null) {
    next()
  }else {
    res.status(422).json(error)
  }
}


statusControllers.get('/', (_, res: Response) => {
  res.status(200).json(status)
})

statusControllers.post('/', validateStatus, (req: Request, res: Response) => {
  status.push(req.body)
  res.status(201).json(req.body)
})

export default statusControllers;