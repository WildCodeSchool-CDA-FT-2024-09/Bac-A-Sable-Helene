import express, { Request, Response } from "express";
import { Repo } from "./repo.entities";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";

const repoControllers = express.Router();

repoControllers.get('/', async (req: any, res: Response) => {
  try {
    // Récupérer le paramètre `lang` depuis la query string
    const { lang } = req.query;
    let repos;

    if (lang) {
      // Si un langage est spécifié, chercher les dépôts qui utilisent ce langage
      repos = await Repo.createQueryBuilder('repo')
        .leftJoinAndSelect('repo.languages', 'lang')  // Joindre la relation avec les langages
        .leftJoinAndSelect('repo.status', 'status')   // Joindre la relation avec le statut
        .where('lang.name = :lang', { lang })         // Filtrer par le nom du langage
        .getMany();
    } else {
      // Sinon, récupérer tous les dépôts avec toutes les relations
      repos = await Repo.find( {
           relations : {
             status: true,
             languages: true
           }
         });
    }

   
    res.status(200).json(repos)
  } catch (error) {
    res.sendStatus(500)
  }
  
})

repoControllers.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const repo = await Repo.findOne({
      where: { id },
      relations : ['languages', 'status'] 
    });
    if (!repo) {
      return res.status(404).json({ message: 'Dépôt non trouvé' });
    }
    return res.json(repo);
  } catch (error) {
    console.error("Erreur lors de la récupération du dépôt :", error);
    return res.sendStatus(500);
  }
});


 repoControllers.post('/', async (req: Request, res: Response) => {
  try {
    const repo = new Repo();
    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;

    //findOneOrFail pour chercher un id mais éjecte une erreur si ne trouve pas l'id
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

// repoControllers.delete('/:id',  async (req: Request, res: Response) => {
//   try {
//     const repoId = req.params.id;

//     if (!repoId) {
//       return res.status(400).json({ message: 'Invalid ID format' });
//     }

//     // Vérifie d'abord si l'élément existe
//     const repo = await Repo.findOne({ where: { id: repoId } });
//     if (!repo) {
//       return res.status(404).json({ message: `Repo with id ${repoId} not found` });
//     }

//     await Repo.delete(repoId);

//     return res.sendStatus(204);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }

//  })
repoControllers.get("/:id", async (req: Request, res: Response) => {
  console.log("GET REPOS");
  try {
    const repos = await Repo.find({
      where: {
        id: req.params.id,
      },
      relations: {
        status: true,
        languages: true,
      },
    });
    res.status(200).json(repos);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// // repoControllers.put('/:id', (req: Request, res: Response)=> {
// // //Recherche de l'index dans le tableau du repo
// // const index = myRepos.findIndex((repo)=> req.params.id == repo.id);

// // // Méthode splice() modifie le contenu d'un tableau en retirant des éléments ou en ajoutant de nouveau éléments.
// //   myRepos.splice(index, 1, req.body)
// //   res.status(200).json(myRepos[index])
// // })


export default repoControllers;
