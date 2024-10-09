import { useEffect, useState } from "react";
import connexion from "../services/connexion";
import type { Lang, Repo } from '../types/RepoType';
import { NavLink, useLocation } from "react-router-dom";


export default function Navbar() {
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
        <NavLink className="nav-link" to="/repos">Tous les Repos</NavLink> {/* Lien pour tous les dépôts */}
        <NavLink className="nav-link" to="/langs">Tous les langages</NavLink>
        
        {languages.map((lang) => (
          <NavLink className="nav-link" key={lang.id} to={`/repos?lang=${lang.name}`}> 
            {lang.name}
          </NavLink>
        ))}
      </nav>   
    </>
  );
}




