// Languages.tsx
import { useEffect, useState } from "react";
import connexion from "../services/connexion";
import type { Lang } from "../types/RepoType"; 
import LanguageCard from "../components/LanguageCard"; 
import { Link } from "react-router-dom"; // Importez Link pour la navigation
import styleComponent from "../components/styleComponent.css";

export default function Languages() {
  const [languages, setLanguages] = useState<Lang[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await connexion.get<Lang[]>("/api/langs");
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  return (
    <div>
      <h1>Langages</h1>
      <div>
        {languages.map((language) => (
          <div key={language.id}>
            <LanguageCard id={language.id} name={language.name} />
            {/* Lien vers la page des dépôts filtrés par langue */}
            <Link to={`/?lang=${language.name}`}>Voir les dépôts en {language.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

