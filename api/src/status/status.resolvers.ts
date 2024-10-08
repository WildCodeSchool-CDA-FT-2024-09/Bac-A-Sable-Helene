import { Query, Resolver } from "type-graphql";
import { Status } from "./status.entities";

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
}