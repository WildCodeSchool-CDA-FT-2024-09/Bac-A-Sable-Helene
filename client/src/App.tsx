import './App.css';
import { useState } from "react";
import type { Repo } from './types/RepoType';
import RepoCard from './components/RepoCard';
import { useQuery } from "@apollo/client";
import GET_REPOS from './services/GET_REPOS';
import GET_LANGS from './services/GET_LANGS';

function App() {
  // State pour gérer l'affichage des repos ou des langues
  const [view, setView] = useState<'repos' | 'languages'>('repos');

  // Requête pour les repos
  const { loading: loadingRepos, error: errorRepos, data: reposData, refetch: refetchRepos } = useQuery(GET_REPOS);

  // Requête pour les langues
  const { loading: loadingLangs, error: errorLangs, data: langsData, refetch: refetchLangs } = useQuery(GET_LANGS);

  // Affichage de loading ou des erreurs
  if (loadingRepos || loadingLangs) return <h1>Loading ...</h1>;
  if (errorRepos || errorLangs) return <p>Error</p>;

  return (
    <>
      <h1 className="titleH1">Mes Repos GitHub</h1>
      <nav className="navbar">
        <button className="nav-link" onClick={() => setView('repos')}>Tous les Repos</button>
        <button className="nav-link" onClick={() => setView('languages')}>Tous les Languages</button>
      </nav>

      <main className="main">
        {view === 'repos' && reposData?.fullrepos && (
          <>
            {reposData.fullrepos.map((repo: Repo) => (
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
                <li key={lang.id}>{lang.name}</li>
              ))}
            </ul>
            <button onClick={refetchLangs}>Rafraîchir Langues</button>
          </>
        )}
      </main>

    </>
  );
}


export default App;
