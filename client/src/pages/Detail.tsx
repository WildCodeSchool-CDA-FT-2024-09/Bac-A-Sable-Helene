// useParams pour utiliser le loader utilisé dans main
import { useLoaderData } from "react-router-dom";
import type { Repo } from "../types/RepoType";
import "./stylePage.css";

export default function Detail() {
  console.log("Initialisation du Detail");

  const data = useLoaderData() as Repo; 
    console.log("Données récupérées dans Detail:", data);

  if (!data || !data.languages) {
    return <div>Loading...</div>; // Affiche un message de chargement si `data` est `null`
  }

  return (
    <div className="repo-detail">
      <h1>Détails du dépôt : {data.name}</h1>
      <h3>Langages :</h3>
      <ul>
        {data.languages.map(language => (
          <li key={language.id}>{language.name}</li> 
        ))}
      </ul>
    </div>
  );
}



/**
 * Initialisation
 * data = {} ou undefined
 *
 * Après le useEffect
 * data = {
 *    pers: {
 *      firstname: "Bob"
 *    }
 * }
 */