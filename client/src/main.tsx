import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }
]);

//Requêtes Fetch ok : statut 200
//Requêts fichiers avec React status 304 (ok)

//Le point d'exclamation est pour rendre l'affichage du root (dsn index.html) obligatoire sinon rien ne s'affiche.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />//
  </StrictMode>,
);
