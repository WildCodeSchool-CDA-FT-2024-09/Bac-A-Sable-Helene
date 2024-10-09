import { createBrowserRouter } from "react-router-dom";
import connexion from "./services/connexion.ts";
import App from './App.tsx';
import Detail from './pages/Detail.tsx';
import Languages from "./pages/Languagues.tsx";
import Repos from "./pages/Repos.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/repos",
        element: <Repos />,
        loader: async ( {request }) => {
          const url = new URL(request.url);  // Obtenir l'URL complète
          const lang = url.searchParams.get("lang");  // Extraire la query string `lang`
          const apiUrl = lang ? `/api/repos?lang=${lang}` : '/api/repos';  // Détermine l'URL à appeler
          const response = await connexion.get(apiUrl);  // Fait l'appel à l'API
          return response.data;
        },
      },
      {
        path: "repos/:id",
        element: < Detail />,
        loader: async ({ params }) => {
          const repo = await connexion.get(`/api/repos/${params.id}`);
          console.log("Loader - données récupérées :", repo.data);
          return repo.data;
        },
      },
      {
        path: "/langs",
        element: <Languages />,
        loader: async () => {
          const response = await connexion.get(`/api/langs`);
          console.log("Loader - données récupérées :", response.data);
          return response.data;
      },
      }
    ]
  },

]);

export default router;


