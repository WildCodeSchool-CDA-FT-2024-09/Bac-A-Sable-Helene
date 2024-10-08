import type { Repo } from "../types/RepoType";
import "./styleComponent.css";
import { Link } from "react-router-dom";

function RepoCard({ name, url, status, id }: Repo){
  // Déterminer la couleur en fonction du status.id
  const statusClass = status.label === 'Public' ? 'public' : 'private'; // Vert si Public, Rouge si Private

return (
  <div className="card">
    <h2 className="title">{name} - {status.label}</h2>
    <h3 className={statusClass}>{status.label}</h3>
    <a className="url" href={url} target="_blank" rel="noopener noreferrer">{url}</a>
    <div className="languages">Languages:
    <Link className="link" to={`/details/${id}`} > voir le détail</Link>
    </div>
  </div>
);
}

export default RepoCard

