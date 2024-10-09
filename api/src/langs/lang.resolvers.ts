import { Query, Resolver, Arg } from "type-graphql";
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
  // Méthode pour récupérer une langue par son ID
  @Query(() => Lang, { nullable: true })
  async lang(@Arg("id") id: number) {
    // Utilisation de findOne pour récupérer une langue par son ID
    const lang = await Lang.findOne({ where: { id } }); // Remplacez ceci par votre logique d'accès aux données
    if (!lang) {
      console.warn(`Langue avec l'ID ${id} non trouvée`);
    }
    return lang;
  }
}
