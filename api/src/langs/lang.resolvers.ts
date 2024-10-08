import { Query, Resolver } from "type-graphql";
import { Lang } from './lang.entities';

@Resolver(Lang)
export default class LangResolver {
  // Methode GET pour tous les repos
  @Query(() => [Lang])
  async langs() {
    const langs = await Lang.find({
        relations: {
          repos: true,
         
       },
    });
    console.info(langs);
    return langs;
  }
}