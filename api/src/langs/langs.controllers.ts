import express, { Request, Response } from "express";
import { Lang } from '../langs/lang.entities';
//import Joi from "joi";

const langsControllers = express.Router();

// // const schema = Joi.object({
// //   id: Joi.number().required(),
// //   name: Joi.string().required()
// // })

// // const validateLang = (req: Request, res:Response, next: NextFunction) => {
// //   const { error } = schema.validate(req.body)
// //   if (error == null) {
// //     next()
// //   } else {
// //     res.status(422).json(error)
// //   }
// // }


langsControllers.get('/', async (_: any, res: Response) => {
  try {
    const langs = await Lang.find();
  res.status(200).json(langs)
} catch (error) {
  res.sendStatus(500)
}
})

// langsControllers.get('/:id', (req: Request, res: Response)=> {
//   const lang = langs.find(lg => lg.id === parseInt(req.params.id)) as Lang;
// if (lang) {
//   res.status(200).json(lang)
// }else {
//   res.sendStatus(404)
// }
// } 
// )

langsControllers.post('/', async (req: Request, res: Response)=> {
  // langs.push(req.body)
  try {
    const lang = new Lang();
    lang.name = req.body.name;

    await lang.save();
  res.status(201).json(req.body)
  } catch  (error) {
    res.sendStatus(500)
  }
})

export default langsControllers;


