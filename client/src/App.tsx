import './App.css';
import { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import type { Repo } from './types/RepoType';
import RepoCard from './components/RepoCard';
import {
  useLangsQuery, 
  useFullreposQuery,
  useLoginLazyQuery,
} from "./generated/graphql-types";
import Navbar from './components/NavBar';

function App() {
  const location = useLocation();
  const { langId } = useParams<{ langId?: string }>(); // Récupérer l'id de language dans l'URL

  // State pour gérer l'affichage des repos ou des langues
  const [view, setView] = useState<'repos' | 'languages'>('repos');
  const [login] = useLoginLazyQuery();


  // Utilisation du hook généré par GraphQL Codegen pour les repos  
  const { loading: loadingRepos, error: errorRepos, data: reposData, refetch: refetchRepos } = useFullreposQuery( {
    fetchPolicy: 'cache-and-network', // Utilise d'abord le cache, puis rafraîchit les données en arrière-plan
  });

  // Requête GraphQL pour récupérer les langues
  const { data: langsData, loading: loadingLangs, error: errorLangs } = useLangsQuery();

    // Effet pour mettre à jour la vue basée sur l'URL
  useEffect(() => {
    if (location.pathname === '/languages') {
      setView('languages');
    } else {
      setView('repos');
    }
  }, [location.pathname]); // Dépendance sur l'URL
  
 // Déterminer les repos à afficher en fonction de langId
    const reposToDisplay = langId
    ? (reposData?.fullrepos || []).filter((repo) => {
      // console.log("Repo", repo); 
      console.log("Repos Data:", reposData); 
      // console.log("Repo languages:", repo.languages);
      const typedRepo = repo as Repo; 

      return Array.isArray(typedRepo.languages) && typedRepo.languages.some((language) => language.id.toString() === langId);
    })
    : reposData?.fullrepos;

  const handleLogin = async () => {
    // useQuery...
    await login({
      variables: {
        email: "test@test.com",
        password: "argon2hash",
      },
    });
  };

  // Affichage de loading ou des erreurs
  if (loadingRepos || loadingLangs) return <h1>Loading ...</h1>;
  if (errorLangs) return <p>Error loading languages: {errorLangs.message}</p>;
  if (errorRepos) return <p>Error: {errorRepos.message}</p>;

  return (
    <>
      <h1 className="titleH1">Mes Repos GitHub</h1>
      <Navbar /> 
      <button type="button" onClick={handleLogin}>
        LOGIN
      </button>

      <main className="main">
        {view === 'repos' && reposToDisplay  && (
          <>
            {/* Affichage des repos filtrés */}
            {reposToDisplay.map((repo) => (
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

        {view === 'languages' && langsData?.langs  && (
          <>
            <h2 className="langCard">Liste des Langues</h2>
            <ul className="langUrl">
              {langsData.langs.map((lang: { id: number; name: string }) => (
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