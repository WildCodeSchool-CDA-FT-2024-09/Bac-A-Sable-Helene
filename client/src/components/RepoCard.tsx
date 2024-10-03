import type { Repo, Lang } from "../types/RepoType";
import "./styleComponent.css";

function RepoCard({ name, url, status, languages }: Repo){
  // Déterminer la couleur en fonction du status.id
  const statusClass = status.label === 'Public' ? 'public' : 'private'; // Vert si Public, Rouge si Private

return (
  <div className="card">
    <h2 className="title">{name} - {status.label}</h2>
    <h3 className={statusClass}>{status.label}</h3>
    <a className="url" href={url} target="_blank" rel="noopener noreferrer">{url}</a>
    {/* href={url} : Définit l'URL vers laquelle le lien pointe.

        target="_blank" : Ouvre le lien dans un nouvel onglet. C'est une pratique courante pour les liens externes.
        
        rel="noopener noreferrer" : Améliore la sécurité en empêchant la nouvelle page d'accéder à la page d'origine et aide également à prévenir les attaques de type phishing. Cela est particulièrement important lorsque tu utilises target="_blank".
  */}
    <div className="languages">Languages:
     <ul className="langsList">
      {languages.map((lang: Lang) => (
        <li key={lang.name} className="langTag">{lang.name}</li>
      ))}
    </ul> 
    </div>
  </div>
);
}

export default RepoCard