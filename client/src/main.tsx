import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ApolloProvider } from "@apollo/client";
// import connexion from "./services/connexion.ts";
import client from "./services/connexion.ts";

// import App from './App.tsx';

import './index.css';
// import Detail from './pages/Detail.tsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/details/:id",
//     element: < Detail />,
//     loader: async ({ params }) => {
//       const repos = await connexion.get(`/api/repos/${params.id}`);
//       console.log("Loader", repos);
//       return repos.data;
//     },
//   }
// ]);

//Requêtes Fetch ok : statut 200
//Requêts fichiers avec React status 304 (ok)

//Le point d'exclamation est pour rendre l'affichage du root (dsn index.html) obligatoire sinon rien ne s'affiche.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode> 
);
