import type { Lang } from "../types/RepoType";
import "./styleComponent.css";

function LanguageCard({ name, id }: Lang){

return (
  <div className="card">
    <h2 className="title" key={id}>{name}</h2>
  </div>
);
}

export default LanguageCard
