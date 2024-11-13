export type Lang = {
  id: number;
  name: string
}

export type Status = {
  __typename?: "Status";
  id: number;
  label?: string;
};


export type Repo = {
  __typename?: 'Repo';
  id: string;
  name: string;
  url: string;
  languages: Lang[]; 
  isFavorite: boolean;
  status: Status;
};
