import express, { Request, Response, NextFunction } from "express";
import repos from '../../data/repos.json';
import type { Repo } from "./repo.type";
import Joi from "joi";

const repoControllers = express.Router();

let myRepos : Array<Repo> = repos;

const schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  url: Joi.string().required(),
  isPrivate: Joi.number().min(1).max(2).required()
})


const validateRepo = (req: Request, res: Response, nest : NextFunction) =>{
  const { error } = schema.validate(req.body)
  if (error == null){
    nest()
  }else {
    res.status(422).json(error) // info sur l'erreur
  }
}

repoControllers.get('/', (req: Request, res: Response) => {
  const { status } =  req.query;
  const result = status !== undefined ? myRepos.filter((repo: Repo) => repo.isPrivate === +status) : myRepos;
  res.status(200).json(result)
})

repoControllers.get('/:id', (req: Request, res: Response) => {
  const repo = repos.find((rep: Repo) => rep.id === req.params.id) as Repo;
  if (repo) {
    res.status(200).json(repo)
  } else {
    res.sendStatus(404)
  }
})

 repoControllers.post('/', validateRepo, (req: Request,res: Response) => {
   repos.push(req.body)
  res.status(201).json(req.body)
 })

repoControllers.delete('/:id', (req: Request, res: Response) => {
  //console.log(req.params.id);
  myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id)
  res.sendStatus(204)
})


repoControllers.put('/:id', (req: Request, res: Response)=> {
//Recherche de l'index dans le tableau du repo
const index = myRepos.findIndex((repo)=> req.params.id == repo.id);

// Méthode splice() modifie le contenu d'un tableau en retirant des éléments ou en ajoutant de nouveau éléments.
  myRepos.splice(index, 1, req.body)
  res.status(200).json(myRepos[index])
})


export default repoControllers;
