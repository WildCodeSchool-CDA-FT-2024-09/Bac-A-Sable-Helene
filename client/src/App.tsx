import './App.css';
import { useEffect, useState } from "react";
import connexion from "./services/connexion";
import type { Repo } from './types/RepoType';
import RepoCard from './components/RepoCard';


function App() {
  const [repos, setRepos] = useState<Repo[]>([]);

  //console.log(repos);

useEffect(() => {
  console.log("I'm the useEffect");

  const fetchRepos = async () => {
    try {
      const repos = await connexion.get<Repo[]>("/api/repos");
      setRepos(repos.data);
    } catch (error) {
      console.error(error);
    }
  }
  fetchRepos();

}, []);

  return (
    <>
      <h1 className="titleH1">Mes repos GitHub</h1>
      <main className="main">
      {repos.map((repo: Repo) => (
        <RepoCard  
          key={repo.name} 
          name={repo.name} 
          url={repo.url} 
          status={repo.status} 
          languages={repo.languages}
          />
      ))}
     </main>
    </>
  );
}

export default App


// const pers = {
//   id: 1,
//   name: "Bob",
//   firstname: "Smith",
//   like: false
// }

// // bouton pour passer à like

// const handleLike = () => {
//   const updatePers = {...pers};
//   updatePers.like = !pers.like
//   setPers(updatePers)
// }

// Equivalent: prev signfit state précédent cad je fais la copie et je modifie par son contraire pour like
// onClick={() => setPers((prev) => ({...prev, like: !prev.like}))}
