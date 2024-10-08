import { createBrowserRouter } from "react-router-dom";
import connexion from "./services/connexion.ts";
import App from './App.tsx';
import Detail from './pages/Detail.tsx';
import Languages from "./pages/Languagues.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "details/:id",
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


