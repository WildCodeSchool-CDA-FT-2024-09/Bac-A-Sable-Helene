import * as fs from "fs";

type Repo = {
  id: string;
  name: string;
  url: string;
  isPrivate: number;
}

type Lang = {
  id: number;
  label: string;
}

type LangRaw = {
  node: { name: string}
}


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
let langId: number = 1;

raw.forEach((rep: any) => {
  rep.languages.forEach((lang: LangRaw)=> {
    if (!langs.some((lg: Lang)=> lg.label === lang.node.name))
    langs.push({id: langId, label: lang.node.name});
    langId++;
  }
  
  )
})

  await fs.writeFile(
    './data/repos.json',
    JSON.stringify(repo),
    (err) =>
    err ? console.log(err) : console.log("File repo is ready")
  )

await fs.writeFile(
  './data/langs.json',
  JSON.stringify(langs),
  (err) =>
  err ? console.log(err) : console.log('File langs is ready')
)

})()