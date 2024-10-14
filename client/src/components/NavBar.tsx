import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import GET_LANGS from '../services/GETLANGS';

const Navbar = () => {
  // Requête pour récupérer toutes les langues
  const { loading, error, data } = useQuery(GET_LANGS);

  if (loading) return <nav>Loading...</nav>;
  if (error) return <nav>Error loading languages</nav>;

  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Tous les Repos</Link>
      {data.langs.map((lang: { id: number; name: string }) => (
        <Link
          key={lang.id}
          className="nav-link"
          to={`/languages/${lang.id}`}
        >
          {lang.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
