import type { Repo, Lang } from "../types/RepoType";
import "./styleComponent.css";

function RepoCard({ name, url, status, languages }: Repo){
  // Déterminer la couleur en fonction du status.id
  const statusColor = status.label === 'Public' ? 'green' : 'red'; // Vert si Public, Rouge si Private

return (
  <div className="card">
    <h2 className="title">{name} - {status.label}</h2>
    <h3 style= {{color: statusColor}}>{status.label}</h3>
    <h3 className="url">{url}</h3>
    <div>Languages:
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