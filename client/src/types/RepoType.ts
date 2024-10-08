export type Lang = {
  id: number;
  name: string
}

export type Repo = {
  id: string;
  name: string;
  url: string;
  status: {
    label: string;
  } ;
  languages: Lang[]; 
}

export type Status = {
  id: number;
  name: string;
};