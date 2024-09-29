// fs= File System permet de lire et d'écrire des fichiers sur le disque
import * as fs from "fs";

// Définition des types
type Repo = {
  id: string;
  name: string;
  url: string;
  isPrivate: number;
}

type Lang = {
  id: number;
  name: string;
}

type RepoLang = { 
  repo_id: string; 
  lang_id: number}


  // Lecture et traitement du fichier raw.json, lu en synchrone dont le contenu est transformé en objet JS via JSON.parse
(async()=> {
  const raw= await JSON.parse(
    fs.readFileSync("./data/raw.json", {encoding: "utf-8"})
  )

  //Chaque dépot ds le fichier raw.json est converti en objet de type Repo. Le champ isPrivate est transformé en nb (1 si le dépot est privé)
  const repo: Repo[] = raw.map((rep: {id: string; name: string; url: string, isPrivate: boolean}) => ({
    id: rep.id,
    name: rep.name,
    url: rep.url,
    isPrivate: rep.isPrivate ? 1 : 2
  }))

  // Creation des tables de langage et des relations entre dépot et langage
  const langs: Lang[] = [];
  const repoLang: RepoLang[] = [];
  let langId: number = 1;

  raw.forEach((rep: any) => { //forEach permet de formater la donnée avant de faire un tableau
    rep.languages.forEach((lang: { node: { name: string}}) => {
      // Tris pour récupérer la liste des langages uniques
      if (!langs.some((lg: Lang) => lg.name === lang.node.name)) {
        // Si un langage n'existe pas encore dans la liste, il est ajouté avec un identifiant unique.
        langs.push({id: langId, name: lang.node.name });
        langId++;
      }

      // Pour chaque dépôt, on associe les langages via leurs identifiants (lang_id).
      const languageId = langs.map((e) => e.name).indexOf(lang.node.name) + 1;
      repoLang.push({ repo_id: rep.id, lang_id: languageId });

    })
  })

// Ecriture des fichiers JSON
fs.writeFile(
    './data/repos.json',
    JSON.stringify(repo), //Le fichier transformé est enregistré avec les données extraites et stucturées (id, namen url, isPrivate)
    (err) =>
    err ? console.log(err) : console.log("File repo is ready")
  )

fs.writeFile(
  './data/langs.json',
  JSON.stringify(langs),  // langs.json contient les informations des langages (id, name)
  (err) =>
  err ? console.log(err) : console.log('File langs is ready')
)

fs.writeFile(
  './data/status.json', // status.json contient les statuts des dépots (privé, public)
  JSON.stringify([
  {id: 1, name : "Private"},{id: 2, name: "Public"}]),
  (err) =>
  err ? console.log(err) : console.log("File status is ready") 
)

fs.writeFile(
  './data/repoLang.json', // repoLang.json : Contient la relation entre les dépôts et les langages (via les identifiants repo_id et lang_id).
  JSON.stringify(repoLang),
  (err) => 
  err ? console.log(err) : console.log("File repoLang is ready")
)

})()