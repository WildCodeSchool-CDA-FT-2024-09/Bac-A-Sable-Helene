import './App.css';
import { useState, useEffect } from "react";
import type { Repo } from './types/RepoType';
import RepoCard from './components/RepoCard';
import { useQuery, gql } from "@apollo/client";
import GETREPOS from './services/GETREPOS';
import Navbar from './components/NavBar';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  const UPDATE_FAVORITE_STATUS = gql`
  mutation UpdateFavoriteStatus($id: String!, $isFavorite: Boolean!) {
    updateFavoriteStatus(id: $id, isFavorite: $isFavorite) {
      id
      isFavorite
    }
  }
`;

  // State pour gérer l'affichage des repos ou des langues
  const [view, setView] = useState<'repos' | 'languages'>('repos');
  const [filter, setFilter] = useState<string | null>(null); // State pour stocker le filtre
  const [allLanguages, setAllLanguages] = useState<{ id: number; name: string }[]>([]); // State pour stocker toutes les langues
  const [filteredReposCache, setFilteredReposCache] = useState<{ [key: string]: Repo[] }>({}); // Cache local des repos filtrés par langue

  // const [isFetching, setIsFetching] = useState<boolean>(false); // Gère l'état de chargement manuellement


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
      fetchPolicy: 'cache-and-network', // Utilise d'abord le cache, puis rafraîchit les données en arrière-plan
      onCompleted: (data) => {
        if (data?.getAllRepos) {
          // Met à jour la liste des langues une seule fois lors du chargement initial
          if (allLanguages.length === 0) {
            const languages = getUniqueLanguages(data.getAllRepos);
            setAllLanguages(languages);
          }
          // Mise à jour du cache local avec les repos filtrés
          if (filter !== null) {
            setFilteredReposCache((prevCache) => ({
              ...prevCache,
              [filter]: data.getAllRepos // Stocke les résultats pour ce filtre/langue
            }));
          } else {
            setFilteredReposCache((prevCache) => ({
              ...prevCache,
              all: data.getAllRepos // Stocke les résultats pour "Tous les Repos"
            }));
          }
        }
      }
  
    });

  // Fonction pour filtrer les repos par langue (au clic sur une langue)
  const filterRepoByLanguage = (langId: string | null) => {
    setFilter(langId); // Met à jour l'état avec l'ID de la langue sélectionnée

    // Si les repos pour cette langue sont déjà dans le cache local, on ne fait pas de nouvelle requête
    if (langId !== null && filteredReposCache[langId]) {
      return; // Ne refait pas la requête, utilise le cache local
    }
    if (langId === null && filteredReposCache.all) {
      return; // Si on clique sur "Tous les Repos" et qu'ils sont déjà dans le cache
    }
 // Si pas dans le cache, on lance la requête
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
  if (errorRepos) return <p>Error: {errorRepos.message}</p>;

  // Détermine quels repos afficher : ceux dans le cache ou les résultats actuels
  const reposToDisplay = filter === null
  ? filteredReposCache.all || reposData?.getAllRepos
  : filteredReposCache[filter] || reposData?.getAllRepos;


  return (
    <>
      <h1 className="titleH1">Mes Repos GitHub</h1>

      <Navbar /> {/* Inclure la barre de navigation */}

        {/* Barre de navigation avec toutes les langues */}
          {/* <nav className="navbar">
            <Link className="nav-link" to="/" onClick={() => filterRepoByLanguage(null)}>
              <a className="nav-link" href="#">Tous les Repos</a>
            </Link> */}

        {/* Affichage dynamique des langues dans la navigation */}
          {/* {allLanguages.map((lang: { id: number; name: string }) => (
            <Link to={`/languages/${lang.id}`} 
              key={lang.id} 
              className="nav-link" 
              onClick={() => filterRepoByLanguage(String(lang.id))}>
              {lang.name}
            </Link>
            ))}
          </nav> */}


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