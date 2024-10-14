import { Repo,LightRepo } from "./repo.entities";
import { ID, Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Status } from "../status/status.entities";
import LangResolver from "../langs/lang.resolvers";

@InputType()
// Blocage du types des différents champs de Repo avec Partial: verouillage des types et des possibilités d'ajout un champ
class RepoInput {
  @Field()
  id: string;

  @Field()
  name : string;

  @Field()
  url: string;

  @Field()
  isFavorite: boolean;

  @Field(() => [ID])  // Besoin de spécifier pour les tableaux le type pour graphQL
  languages: number[];

  @Field(() => [ID])
  status: number[];
}

@Resolver(Repo)
export default class RepoResolver {
  // Methode GET pour tous les repos
  @Query(() => [Repo])
  async fullrepos() {
    const repos = await Repo.find({
       relations: {
         status: true,
         languages: true,
       },
    });
    console.info(repos);
    return repos;
  }

  @Query(() => [Repo])
  async getAllRepos(@Arg("filter", {nullable: true}) filter: string) {
    if (filter) {
      return await Repo.find({
        where: { languages: {
          id: Number(filter)
        }},
        relations: { languages: true, status: true }
    });
    }
    return await Repo.find({
      relations: { languages: true, status: true }
    });
  }

   @Query(() => [LightRepo])
   async lightrepos() {
     const repos = await Repo.find();
     console.info(repos);
     return repos;
   }

   @Mutation(() => Repo)
   async createNewRepo(@Arg("data") newRepo: RepoInput) {
     //const newRepo: RepoInput = req.body.data
     // fonction de validation
     console.info(newRepo);
 
     const repo = new Repo();
     repo.id = newRepo.id;
     repo.name = newRepo.name;
     repo.url = newRepo.url;
     repo.isFavorite = newRepo.isFavorite;
 
     const status = await Status.findOneOrFail({
       where: { id: +newRepo.status },
     });
     repo.status = status;

     // Appel à LangResolver pour récupérer les langues par ID
     const langResolver = new LangResolver();
     const languages = [];
     for (const langId of newRepo.languages) {
       const lang = await langResolver.lang(langId);
       if (lang) {
         languages.push(lang);
       }
     }
 
     repo.languages = languages;
 
     await repo.save();
     console.log("repo", repo);
     const myRepo = await Repo.findOneOrFail({
       where: { id: newRepo.id },
       relations: {
         languages: true,
         status: true,
       },
     });
     console.log("myRepo", myRepo);
     return myRepo;
   }

   @Mutation(() => Repo)
  async updateFavoriteStatus(
    @Arg("id") id: string,
    @Arg("isFavorite") isFavorite: boolean
  ) {
    // Cherche le repo à partir de l'ID
    const repo = await Repo.findOneOrFail({ where: { id }, relations: { status: true, languages: true } });

    // Met à jour le statut 'isFavorite'
    repo.isFavorite = isFavorite;

    // Sauvegarde dans la BDD
    await repo.save();

    // Retourne le repo mis à jour
    return repo;
  }

 
}