import { createBrowserRouter } from "react-router-dom";
import connexion from "./services/connexion.ts";
import App from './App.tsx';
import Detail from './pages/Detail.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/details/:id",
    element: < Detail />,
    loader: async ({ params }) => {
      const repos = await connexion.get(`/api/repos/${params.id}`);
      console.log("Loader", repos);
      return repos.data;
    },
  }
]);

export default router;


