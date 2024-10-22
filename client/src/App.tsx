import './App.css';
import { useState, useEffect } from "react";
import type { Repo } from './types/RepoType';
import RepoCard from './components/RepoCard';
// import { useQuery, gql } from "@apollo/client";
import { useFullreposQuery, useLangsQuery } from './generated/graphql-types';
// import GETREPOS from './services/GETREPOS';
import Navbar from './components/NavBar';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  // State pour gérer l'affichage des repos ou des langues
  const [view, setView] = useState<'repos' | 'languages'>('repos');
  const [filter, setFilter] = useState<string | null>(null); // State pour stocker le filtre
  const [allLanguages, setAllLanguages] = useState<{ id: number; name: string }[]>([]); // State pour stocker toutes les langues
  const [filteredReposCache, setFilteredReposCache] = useState<{ [key: string]: Repo[] }>({}); // Cache local des repos filtrés par langue

  // Effet pour mettre à jour la vue basée sur l'URL
  useEffect(() => {
    if (location.pathname === '/languages') {
      setView('languages');
    } else {
      setView('repos');
    }
  }, [location.pathname]); // Dépendance sur l'URL


    // Utilisation du hook généré par GraphQL Codegen pour les repos  
    const { loading: loadingRepos, error: errorRepos, data: reposData, refetch: refetchRepos } = useFullreposQuery( {
      variables: { filter },
      fetchPolicy: 'cache-and-network', // Utilise d'abord le cache, puis rafraîchit les données en arrière-plan
      // onCompleted: (data) => {
      //   if (data?.getAllRepos) {
      //     // Met à jour la liste des langues une seule fois lors du chargement initial
      //     if (allLanguages.length === 0) {
      //       const languages = getUniqueLanguages(data.getAllRepos);
      //       setAllLanguages(languages);
      //     }
      //     // Mise à jour du cache local avec les repos filtrés
      //     if (filter !== null) {
      //       setFilteredReposCache((prevCache) => ({
      //         ...prevCache,
      //         [filter]: data.getAllRepos // Stocke les résultats pour ce filtre/langue
      //       }));
      //     } else {
      //       setFilteredReposCache((prevCache) => ({
      //         ...prevCache,
      //         all: data.getAllRepos // Stocke les résultats pour "Tous les Repos"
      //       }));
      //     }
      //   }
      // }
    });

      // Utilisation du hook généré par GraphQL Codegen pour les langues
  const { data: langsData, loading: loadingLangs, error: errorLangs } = useLangsQuery({
    fetchPolicy: 'cache-and-network',
  });

  // Met à jour les langues après récupération des repos
  useEffect(() => {
    if (reposData && allLanguages.length === 0) {
      const uniqueLangs = getUniqueLanguages(reposData.fullrepos);
      setAllLanguages(uniqueLangs);
    }
  }, [reposData]);

  const filterRepoByLanguage = (langId: string | null) => {
    setFilter(langId);

    if (langId !== null && filteredReposCache[langId]) {
      return;
    }

    if (langId === null && filteredReposCache.all) {
      return;
    }

    refetchRepos({ filter: langId });
  };

  // Extraire les langues uniques à partir des repos
  const getUniqueLanguages = (repos: Repo[]) => {
    const languagesSet = new Set<string>();

    repos.forEach(repo => {
       // Vérifiez que repo.languages est défini et que c'est un tableau
      if (repo.languages && Array.isArray(repo.languages)) {
        repo.languages.forEach(lang => {
          languagesSet.add(JSON.stringify(lang)); // JSON.stringify pour éviter les duplications par référence
        });
      }
    });
    return Array.from(languagesSet).map(lang => JSON.parse(lang));
  };

  // Affichage de loading ou des erreurs
  if (loadingRepos) return <h1>Loading ...</h1>;
  if (errorRepos) return <p>Error: {errorRepos.message}</p>;

  // Détermine quels repos afficher : ceux dans le cache ou les résultats actuels
  const reposToDisplay = filter === null
  ? filteredReposCache.all || reposData?.fullrepos
  : filteredReposCache[filter] || reposData?.fullrepos;


  return (
    <>
      <h1 className="titleH1">Mes Repos GitHub</h1>

      <Navbar /> 

      <main className="main">
        {view === 'repos' && reposToDisplay  && (
          <>
            {/* Affichage des repos filtrés */}
            {reposToDisplay.map((repo: Repo) => (
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
            <button onClick={() => refetchRepos()}>Rafraîchir Repos</button>
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