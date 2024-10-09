import './App.css';
import { useState, useEffect } from "react";
import type { Repo } from './types/RepoType';
import RepoCard from './components/RepoCard';
import { useQuery } from "@apollo/client";
import GETREPOS from './services/GETREPOS';
import GETLANGS from './services/GETLANGS';

import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  // State pour gérer l'affichage des repos ou des langues
  const [view, setView] = useState<'repos' | 'languages'>('repos');
  const [filter, setFilter] = useState<string | null>(null); // State pour stocker le filtre

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
      variables: { filter: filter || null }
    });

     // Fonction pour filtrer les repos par langue (au clic sur une langue)
  const filterRepoByLanguage = (langId: string | null) => {
    setFilter(langId); // Met à jour l'état avec l'ID de la langue sélectionnée
    refetchRepos({ filter: langId }); // Relance la requête pour filtrer par langue
  };

  // Requête pour récupérer tous les langues
  const { loading: loadingLangs, error: errorLangs, data: langsData, refetch: refetchLangs } = useQuery(GETLANGS);

  // Affichage de loading ou des erreurs
  if (loadingRepos || loadingLangs) return <h1>Loading ...</h1>;
  if (errorRepos || errorLangs) return <p>Error</p>;


  return (
    <>
      <h1 className="titleH1">Mes Repos GitHub</h1>

        {/* Barre de navigation avec toutes les langues */}
          <nav className="navbar">
            <button className="nav-link" onClick={() => filterRepoByLanguage(null)}>
              <a className="nav-link" href="#">Tous les Repos</a>
            </button>

        {/* Affichage dynamique des langues dans la navigation */}
          {langsData?.langs?.map((lang: { id: number; name: string }) => (
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

        {view === 'languages' && langsData?.langs && (
          <>
            <h2 className="langCard">Liste des Langues</h2>
            <ul className="langUrl">
              {langsData.langs.map((lang: { id: number; name: string }) => (
                <li key={lang.id}>
                  {lang.name}
              </li>
              ))}
            </ul>
            {/* <button onClick={refetchLangs}>Rafraîchir Langues</button> */}
          </>
        )}
      </main>

    </>
  );
}


export default App;