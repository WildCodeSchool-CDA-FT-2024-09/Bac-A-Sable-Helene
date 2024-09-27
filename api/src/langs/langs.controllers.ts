import express, { Request, Response, NextFunction } from "express";
import langs from "../../data/langs.json";
import type { Lang } from './lang.type';
import Joi from "joi";

const langsControllers = express.Router();

const schema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required()
})

const validateLang = (req: Request, res:Response, next: NextFunction) => {
  const { error } = schema.validate(req.body)
  if (error == null) {
    next()
  } else {
    res.status(422).json(error)
  }
}


langsControllers.get('/', (_: any, res: Response) => {
  res.status(200).json(langs)
})

langsControllers.get('/:id', (req: Request, res: Response)=> {
  const lang = langs.find(lg => lg.id === parseInt(req.params.id)) as Lang;
if (lang) {
  res.status(200).json(lang)
}else {
  res.sendStatus(404)
}
} 
)

langsControllers.post('/', validateLang, (req: Request, res: Response)=> {
  langs.push(req.body)
  res.status(201).json(req.body)
})

export default langsControllers;

