import { Repo,LightRepo } from "./repo.entities";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
// Blocage du types des différents champs de Repo avec Partial: verouillage des types et des possibilités d'ajout un champ
class RepoInput implements Partial<Repo> {
  @Field()
  id: string;

  @Field()
  name : string;

  @Field()
  url: string;
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
    const repo = await Repo.findOneOrFail({
      where: { id: "R_kgDOM2SnhA" },
       relations: {
         languages: true,
         status: true,
       },
    });
    console.log(repo);
    return repo;
  }
}