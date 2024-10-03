export type Lang = {
  name: string
}

export type Repo = {
  name: string;
  url: string;
  status: {
    label: string;
  } ;
  languages: Lang[]; 
}
