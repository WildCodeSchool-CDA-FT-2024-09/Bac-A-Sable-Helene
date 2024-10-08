import express, { Request, Response } from "express";
import { Lang } from '../langs/lang.entities';
import { validate } from "class-validator";

const langsControllers = express.Router();

langsControllers.get('/', async (_: any, res: Response) => {
  try {
    const langs = await Lang.find({
      relations : {
        repos: true
      }
    });
  res.status(200).json(langs)
} catch (error) {
  res.sendStatus(500)
}
})

langsControllers.post('/', async (req: Request, res: Response)=> {
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

    // Vérifie d'abord si l'élément existe
    const lang = await Lang.findOne({ where: { id: langId } });
    if (!lang) {
      return res.status(404).json({ message: `Lang with id ${langId} not found` });
    }

    await Lang.delete(langId);

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

 })

export default langsControllers;


