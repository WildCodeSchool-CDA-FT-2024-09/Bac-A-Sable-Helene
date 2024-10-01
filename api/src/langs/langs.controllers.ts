import express, { Request, Response } from "express";
import { Lang } from '../langs/lang.entities';
import { validate } from "class-validator";

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

    const error = await validate(lang)
    if (error.length > 0) {
      res.status(422).json(error)
    } else {
    await lang.save();
    res.status(201).json(req.body)
    }
  } catch  (error) {
    res.sendStatus(500)
  }
})

langsControllers.delete('/:id',  async (req: Request, res: Response) => {
  try {
    const langId = parseInt(req.params.id);

    if (isNaN(langId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    console.log(`Recherche de la langue avec l'ID : ${langId}`);

    // Vérifie d'abord si l'élément existe
    const lang = await Lang.findOne({ where: { id: langId } });
    if (!lang) {
      console.log(`Langue avec l'ID ${langId} non trouvée`);
      return res.status(404).json({ message: `Lang with id ${langId} not found` });
    }

    console.log(`Suppression de la langue avec l'ID : ${langId}`);
    await Lang.delete(langId);

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

 })

export default langsControllers;


