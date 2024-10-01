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

statusControllers.delete('/:id',  async (req: Request, res: Response) => {
  try {
    const statusId = parseInt(req.params.id);

    if (isNaN(statusId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Vérifie d'abord si l'élément existe
    const status = await Status.findOne({ where: { id: statusId } });
    if (!status) {
      return res.status(404).json({ message: `Status with id ${statusId} not found` });
    }

    await Status.delete(statusId);

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

 })

export default statusControllers;