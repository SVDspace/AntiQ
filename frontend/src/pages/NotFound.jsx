import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container">
        <h1>Page not found</h1>
        <p>The page you were looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Return home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
