import express, { Request, Response } from "express";
//import repos from '../../data/repos.json';
import { Repo } from "./repo.entities";
import { Status } from "../status/status.entities";
//import { validate } from "class-validator";
//import Joi from "joi";

const repoControllers = express.Router();

//let myRepos : Array<Repo> = repos;

// // const schema = Joi.object({
// //   id: Joi.string().required(),
// //   name: Joi.string().required(),
// //   url: Joi.string().required(),
// //   isPrivate: Joi.number().min(1).max(2).required()
// // })


// // const validateRepo = (req: Request, res: Response, nest : NextFunction) =>{
// //   const { error } = schema.validate(req.body)
// //   if (error == null){
// //     nest()
// //   }else {
// //     res.status(422).json(error) // info sur l'erreur
// //   }//
// // }

repoControllers.get('/', async (_: any, res: Response) => {
  // // const { status } =  req.query;
  // // const result = status !== undefined ? myRepos.filter((repo: Repo) => repo.isPrivate === +status) : myRepos;
  try {
    const repos = await Repo.find( {
      relations : {
        status: true
      }
    });
    res.status(200).json(repos)
  } catch (error) {
    res.sendStatus(500)
  }
  
})

// // repoControllers.get('/:id', (req: Request, res: Response) => {
// //   const repo = repos.find((rep: Repo) => rep.id === req.params.id) as Repo;
// //   if (repo) {
// //     res.status(200).json(repo)
// //   } else {
// //     res.sendStatus(404)
// //   }
// // })

 repoControllers.post('/', async (req: Request, res: Response) => {
// //    repos.push(req.body)
// //   res.status(201).json(req.body)
  try {
    const repo = new Repo();
    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;

    const status = await Status.findOneOrFail({ where : { id: req.body.isPrivate}})
    repo.status = status;

    await repo.save();
    res.status(201).json(repo)
    
  } catch  (error) {
  res.sendStatus(500)
  }

 })

// // repoControllers.delete('/:id', (req: Request, res: Response) => {
// //   //console.log(req.params.id);
// //   myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id)
// //   res.sendStatus(204)
// // })


// // repoControllers.put('/:id', (req: Request, res: Response)=> {
// // //Recherche de l'index dans le tableau du repo
// // const index = myRepos.findIndex((repo)=> req.params.id == repo.id);

// // // Méthode splice() modifie le contenu d'un tableau en retirant des éléments ou en ajoutant de nouveau éléments.
// //   myRepos.splice(index, 1, req.body)
// //   res.status(200).json(myRepos[index])
// // })


export default repoControllers;
