import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from "./router";
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);


//Requêtes Fetch ok : statut 200
//Requêts fichiers avec React status 304 (ok)

//Le point d'exclamation est pour rendre l'affichage du root (dsn index.html) obligatoire sinon rien ne s'affiche.