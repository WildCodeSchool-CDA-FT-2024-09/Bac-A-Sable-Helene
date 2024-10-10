import './App.css';
import { useState, useEffect } from "react";
import type { Repo } from './types/RepoType';
import RepoCard from './components/RepoCard';
import { useQuery } from "@apollo/client";
import GETREPOS from './services/GETREPOS';

import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  // State pour gérer l'affichage des repos ou des langues
  const [view, setView] = useState<'repos' | 'languages'>('repos');
  const [filter, setFilter] = useState<string | null>(null); // State pour stocker le filtre
  const [allLanguages, setAllLanguages] = useState<{ id: number; name: string }[]>([]); // State pour stocker toutes les langues

  // Effet pour mettre à jour la vue basée sur l'URL
  useEffect(() => {
    if (location.pathname === '/languages') {
      setView('languages');
    } else {
      setView('repos');
    }
  }, [location.pathname]); // Dépendance sur l'URL


    // Requête pour les repos avec filtre
    const { loading: loadingRepos, error: errorRepos, data: reposData, refetch: refetchRepos } = useQuery(GETREPOS, {
      variables: { filter: filter || null },
      onCompleted: (data) => {
        if (data?.getAllRepos) {
          // Met à jour la liste des langues une seule fois lors du chargement initial
          if (allLanguages.length === 0) {
            const languages = getUniqueLanguages(data.getAllRepos);
            setAllLanguages(languages);
          }
  
        }
      }
  
    });

     // Fonction pour filtrer les repos par langue (au clic sur une langue)
  const filterRepoByLanguage = (langId: string | null) => {
    setFilter(langId); // Met à jour l'état avec l'ID de la langue sélectionnée
    refetchRepos({ filter: langId }); // Relance la requête pour filtrer par langue
  };

  // Extraire les langues uniques à partir des repos
  const getUniqueLanguages = (repos: Repo[]) => {
    const languagesSet = new Set<string>();
    repos.forEach(repo => {
      repo.languages.forEach(lang => {
        languagesSet.add(JSON.stringify(lang)); // JSON.stringify pour éviter les duplications par référence
      });
    });
    return Array.from(languagesSet).map(lang => JSON.parse(lang));
  };

  // Affichage de loading ou des erreurs
  if (loadingRepos) return <h1>Loading ...</h1>;
  if (errorRepos) return <p>Error</p>;


  return (
    <>
      <h1 className="titleH1">Mes Repos GitHub</h1>

        {/* Barre de navigation avec toutes les langues */}
          <nav className="navbar">
            <button className="nav-link" onClick={() => filterRepoByLanguage(null)}>
              <a className="nav-link" href="#">Tous les Repos</a>
            </button>

        {/* Affichage dynamique des langues dans la navigation */}
          {allLanguages.map((lang: { id: number; name: string }) => (
            <button key={lang.id} className="nav-link" onClick={() => filterRepoByLanguage(String(lang.id))}>
              {lang.name}
            </button>
            ))}
          </nav>


      <main className="main">
        {view === 'repos' && reposData?.getAllRepos && (
          <>
            {/* Affichage des repos filtrés */}
            {reposData.getAllRepos.map((repo: Repo) => (
              <RepoCard
                key={repo.id}
                name={repo.name}
                url={repo.url}
                id={repo.id}
                status={repo.status}
                languages={repo.languages}
                isFavorite={repo.isFavorite}
              />
            ))}
            <button onClick={refetchRepos}>Rafraîchir Repos</button>
          </>
        )}

        {view === 'languages' && allLanguages && (
          <>
            <h2 className="langCard">Liste des Langues</h2>
            <ul className="langUrl">
              {allLanguages.map((lang: { id: number; name: string }) => (
                <li key={lang.id}>
                  {lang.name}
              </li>
              ))}
            </ul>
          </>
        )}
      </main>

    </>
  );
}


export default App;