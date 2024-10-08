// Languages.tsx
import { useEffect, useState } from "react";
import connexion from "../services/connexion";
import type { Lang } from "../types/RepoType"; 
import LanguageCard from "../components/LanguageCard"; 

export default function Languages() {
  const [languages, setLanguages] = useState<Lang[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await connexion.get<Lang[]>("/api/languages");
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
          <LanguageCard key={language.id} id={language.id} name={language.name} />
        ))}
      </div>
    </div>
  );
}
