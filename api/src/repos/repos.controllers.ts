import express, { Request, Response } from "express";
import { Repo } from "./repo.entities";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";
//import { validate } from "class-validator";

const repoControllers = express.Router();

repoControllers.get('/', async (_: any, res: Response) => {
  try {
    const repos = await Repo.find( {
      relations : {
        status: true,
        languages: true
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
  try {
    const repo = new Repo();
    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;

    const status = await Status.findOneOrFail({ where : { id: req.body.isPrivate}})
    repo.status = status;

    const languageIds: number[] = req.body.langIds;
    const languages: Lang[]= [];

    for(const langId of languageIds) {
      let lang = await Lang.findOne({ where: { id: langId}});
      
      if (!lang) {
       return res.status(404).json({message: `Lang with id ${langId} not found`})
      }
      languages.push(lang);
    }

    repo.languages = languages;

    //const error = await validate(repo)
    // if (error.length > 0) {
    //   return res.status(422).json(error)
    // } else {

    await repo.save();
    return res.status(201).json(repo)
    //}
  } catch  (error) {
    return res.sendStatus(500)
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
