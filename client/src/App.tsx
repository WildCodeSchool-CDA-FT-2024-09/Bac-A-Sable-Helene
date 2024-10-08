import './App.css';
import { useEffect, useState } from "react";
import connexion from "./services/connexion";
import type { Repo, Lang } from './types/RepoType';
import RepoCard from './components/RepoCard';

import { NavLink, Outlet, useLocation, useNavigate  } from "react-router-dom";

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [languages, setLanguages] = useState<Lang[]>([]);
  const location = useLocation();  // Permet d'accéder à l'URL actuelle
  


  const fetchRepos = async (lang: string | null) => {
    try {
      const url = lang ? `/api/repos?lang=${lang}` : '/api/repos';  // URL selon la langue
      const repos = await connexion.get<Repo[]>(url);
      setRepos(repos.data); // Met à jour les dépôts

    } catch (error) {
      console.error(error);
    }
  };

   // Récupérer les langues depuis le backend
   const fetchLanguages = async () => {
    try {
      const response = await connexion.get<Lang[]>('/api/langs');  // Récupérer toutes les langues
      setLanguages(response.data);  // Met à jour l'état avec les objets de langues
    } catch (error) {
      console.error(error);
    }
  };

    // Appeler les fonctions fetch lors du montage du composant
    useEffect(() => {
      fetchLanguages();  // Charger les langues disponibles
    }, []);

   // Appeler fetchRepos si l'URL change (nouvelle langue)
   useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lang = params.get('lang');  // Récupérer la langue depuis l'URL (query string)
    fetchRepos(lang);  // Récupérer les dépôts filtrés ou non
  }, [location.search]);  // Dépend de l'URL



  return (
    <>
      <nav className="navbar">
        <NavLink className="nav-link" to="/">Tous les Repos</NavLink> {/* Lien pour tous les dépôts */}
        {languages.map((lang) => (
          <NavLink className="nav-link" key={lang.id} to={`/?lang=${lang.name}`}> 
            {lang.name}
          </NavLink>
        ))}
      </nav>

      <h1 className="titleH1">Mes repos GitHub</h1>
      <main className="main">
      {repos.length > 0 ? (
          repos.map((repo: Repo) => (
            <RepoCard  
              key={repo.id}  
              id={repo.id}
              name={repo.name} 
              url={repo.url} 
              status={repo.status} 
              languages={repo.languages}
            />
          ))
        ) : (
          <p>Aucun repo disponible.</p>
        )}
      <Outlet /> {/* Ceci rendra les sous-routes */}


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
