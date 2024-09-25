import * as fs from "fs";

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


(async()=> {
  const raw= await JSON.parse(
    fs.readFileSync("./data/raw.json", {encoding: "utf-8"})
  )

  const repo: Repo[] = raw.map((rep: {id: string; name: string; url: string, isPrivate: boolean}) => ({
    id: rep.id,
    name: rep.name,
    url: rep.url,
    isPrivate: rep.isPrivate ? 1 : 2
  }))

  const langs: Lang[] = [];
  const repoLang: RepoLang[] = [];
  let langId: number = 1;

  raw.forEach((rep: any) => {
    rep.languages.forEach((lang: { node: { name: string}}) => {
      if (!langs.some((lg: Lang) => lg.name === lang.node.name)) {

        langs.push({id: langId, name: lang.node.name });
        langId++;
      }

      const languageId = langs.map((e) => e.name).indexOf(lang.node.name) + 1;
      repoLang.push({ repo_id: rep.id, lang_id: languageId });

    })
  })


fs.writeFile(
    './data/repos.json',
    JSON.stringify(repo),
    (err) =>
    err ? console.log(err) : console.log("File repo is ready")
  )

fs.writeFile(
  './data/langs.json',
  JSON.stringify(langs),
  (err) =>
  err ? console.log(err) : console.log('File langs is ready')
)

fs.writeFile(
  './data/status.json',
  JSON.stringify([
  {id: 1, name : "Private"},{id: 2, name: "Public"}]),
  (err) =>
  err ? console.log(err) : console.log("File status is ready") 
)

fs.writeFile(
  './data/repoLang.json',
  JSON.stringify(repoLang),
  (err) => 
  err ? console.log(err) : console.log("File repoLang is ready")
)

})()