import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Status } from "./status.entities";

 @InputType()
 // Blocage du types des différents champs de Repo avec Partial: verouillage des types et des possibilités d'ajout un champ
 class StatusInput implements Partial<Status> {
  @Field()
  label : string;
 }


@Resolver(Status)
export default class StatusResolver {
  // Methode GET pour tous les repos
  @Query(() => [Status])
  async status() {
    const status = await Status.find({
        relations: {
          repos: true,
         
       },
    });
    console.info(status);
    return status;
  }

   @Mutation(() => Status)
  async createNewStatus(@Arg("data") newStatus: StatusInput) {
     // fonction de validation
   console.info(newStatus);
   const status = await Status.findOneOrFail({
      where: { id: 1 },
      relations: {
      repos: true,
       },
   });
  console.log(status);
  return status;
}
}