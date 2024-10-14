import { useParams, Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import GETREPOS from '../services/GETREPOS'; // Service pour récupérer les repos
import GET_LANGS from '../services/GETLANGS'; // Service pour récupérer les langues
import RepoCard from '../components/RepoCard';
import type { Lang, Repo } from '../types/RepoType';
import Navbar from './NavBar';


function LanguageRepos() {
  const { langId } = useParams(); // Récupère l'ID de la langue depuis l'URL

  // Requête pour récupérer toutes les langues
  const { loading: loadingLangs, error: errorLangs, data: langsData } = useQuery(GET_LANGS);

  // Requête pour récupérer les repos selon la langue sélectionnée (si langId existe)
  const { loading: loadingRepos, error: errorRepos, data: reposData } = useQuery(GETREPOS, {
    variables: { filter: langId }, // Filtre par langue
    skip: !langId, // Ne lance pas la requête si aucune langue n'est sélectionnée
  });

  // Affichage d'un message pendant le chargement ou en cas d'erreur pour les langues
  if (loadingLangs) return <h1>Loading languages...</h1>;
  if (errorLangs) return <p>Error loading languages: {errorLangs.message}</p>;

  // Affichage d'un message pendant le chargement ou en cas d'erreur pour les repos
  if (loadingRepos && langId) return <h1>Loading repos...</h1>;
  if (errorRepos && langId) return <p>Error loading repos: {errorRepos.message}</p>;

  const repos = reposData?.getAllRepos || []; // Récupération des repos ou tableau vide si aucun repo

  return (
    <>
     <Navbar />
      <h1>Les repos utilisant {langId ? langsData?.langs.find((lang: Lang) => lang.id === parseInt(langId))?.name : "Select a language"}</h1>

      {/* Affichage des repos filtrés si une langue est sélectionnée */}
      {langId && (
        <div className="main">
          {repos.length > 0 ? (
            repos.map((repo: Repo) => (
              <RepoCard key={repo.id} {...repo} />
            ))
          ) : (
            <p>No repositories found for this language.</p>
          )}
        </div>
      )}
    </>
  );
}

export default LanguageRepos;
