// useParams pour utiliser le loader utilisé dans main
import { useLoaderData } from "react-router-dom";
// import { useEffect, useState } from "react";
// import connexion from "../services/connexion";
import type { Repo } from "../types/RepoType";
import "../components/styleComponent.css";

export default function Detail() {
  console.log("Initialisation du Detail");

  // const { id } = useParams<{ id: string }>();
  // const [data, setData] = useState<Repo | null>(null);
  const data = useLoaderData() as Repo; 

  
    console.log("Données récupérées dans Detail:", data);

  // useEffect(() => {
  //   console.log("I'm the useEffect in Detail page");
  //   const fetchRepos = async () => {
      // try {
      //   const repos = await connexion.get<Repo[]>(`/api/repos/${id}`);
      //   if (repos.data.length > 0) {
      //     setData(repos.data[0]);
      //     console.log("ID récupéré:", id); 
      //     console.log("Données récupérées:", data);  // On extrait le premier dépôt
      //   } else {
      //     console.error("No repo found"); // Gestion des cas où il n'y a pas de dépôt
      //   }
      // } catch (error) {
      //   console.error(error);
      // }
  //   }
  //   if (id) {
  //     fetchRepos();
  //   }
    
  // }, [id]);

  if (!data || !data.languages) {
    return <div>Loading...</div>; // Affiche un message de chargement si `data` est `null`
  }


  return <div>Detail repo: {data.name}
  <h3>Langages :</h3>
      <ul>
        {data.languages.map(language => (
          <li key={language.id}>{language.name}</li> 
        ))}
      </ul>

  </div>
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