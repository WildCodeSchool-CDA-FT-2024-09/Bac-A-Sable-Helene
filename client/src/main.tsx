import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./services/connexion.ts";
import LanguageRepos from './components/LanguageRepos.tsx';
import App from "./App.tsx";

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/repos",
    element: <App />,
  },
  {
    path: "/languages",
    element: <App />,  
  },
  {
    path: "/languages/:langId", // Route pour afficher les repos par langue
    element: <LanguageRepos />, // Utiliser le nouveau composant LanguageRepos
  },


]);


//Le point d'exclamation est pour rendre l'affichage du root (dsn index.html) obligatoire sinon rien ne s'affiche.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode> 
);

//Requêtes Fetch ok : statut 200
//Requêts fichiers avec React status 304 (ok)
