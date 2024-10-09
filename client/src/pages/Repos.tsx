import type { Repo } from '../types/RepoType';
import RepoCard from '../components/RepoCard';
import { useQuery, gql } from "@apollo/client";

export default function Repos() {
 
const GET_REPOS = gql`
  query Fullrepos {
    fullrepos {
      id
      name
      url
      isFavorite
    }
  }
`;

const { loading, error, data, refetch } = useQuery(GET_REPOS);
if (loading) return <h1>Loading ...</h1>;
if (error) return <p>Error</p>;

  return (
    <>
      <main className="main">
      {data.fullrepos.map((repo: Repo) => (
        <RepoCard
          key={repo.id} 
          name={repo.name}
          url={repo.url}
          id={repo.id}
          status={repo.status} 
          languages={repo.languages}
          isFavorite={repo.isFavorite}
        />
      ))}
      <button onClick={refetch}>Rafraichir</button>
     </main>
    </>
  );
}

