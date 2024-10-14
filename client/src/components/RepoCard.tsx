import type { Repo, Lang } from "../types/RepoType";
import "./styleComponent.css";
import { useMutation } from '@apollo/client';
import UPDATE_FAVORITE_STATUS from '../services/UPDATE_FAVORITE_STATUS';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Coeur plein
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Coeur vide


// import { Link } from "react-router-dom";

function RepoCard({ id, name, url, isFavorite, status, languages }: Repo){
  // Déterminer la couleur en fonction du status.id
  const statusClass = status.label === 'Public' ? 'public' : 'private'; // Vert si Public, Rouge si Private
  const [updateFavoriteStatus] = useMutation(UPDATE_FAVORITE_STATUS);


  const toggleFavorite = () => {
    updateFavoriteStatus({
      variables: {
        id,
        isFavorite: !isFavorite, // Inverser le statut de favori
      },
      optimisticResponse: {
        updateFavoriteStatus: {
          id,
          isFavorite: !isFavorite, // Mettez à jour de manière optimiste le nouveau statut
          __typename: 'Repo', // Nécessaire pour Apollo
        },
      },
    });
  };


return (
  <div className="card">
    <h2 className="title">{name}</h2>
       <h3 className={statusClass}>{status.label}</h3>
    <a className="url" href={url} target="_blank" rel="noopener noreferrer">{url}</a>
    {/* a pour les liens externes
    
        href={url} : Définit l'URL vers laquelle le lien pointe.

        target="_blank" : Ouvre le lien dans un nouvel onglet. C'est une pratique courante pour les liens externes.
        
        rel="noopener noreferrer" : Améliore la sécurité en empêchant la nouvelle page d'accéder à la page d'origine et aide également à prévenir les attaques de type phishing. Cela est particulièrement important lorsque tu utilises target="_blank".
  */}
     {/* Cœur pour gérer les favoris */}
     <p>
        <FontAwesomeIcon
          icon={isFavorite ? solidHeart : regularHeart} // Choix du cœur plein ou vide
          color={isFavorite ? "#aa6762" : "grey"} // Rouge si favori, gris sinon
          size="lg"
          onClick={toggleFavorite} // Basculer le statut de favori au clic
          style={{ cursor: 'pointer' }} // Curseur pointeur pour montrer que c'est cliquable
        />
      </p>
     <div className="languages">Languages:
        {/* <Link to={`/details/${id}`} >   voir le détail</Link> */}
          <ul>
            {languages.map((lang: Lang) => (
              <li key={lang.name} className="langTag">{lang.name}</li>
          ))}
          </ul> 
     </div> 

  </div>
);
}

export default RepoCard

