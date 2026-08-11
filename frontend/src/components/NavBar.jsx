import { NavLink } from 'react-router-dom';

function NavBar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">AntiQ</h1>
        <input id="nav-toggle-safe" type="checkbox" className="nav-toggle" />
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/book-token">Book Token</NavLink>
          </li>
          <li>
            <NavLink to="/check-status">Check Status</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/login">Sign In / Sign Up</NavLink>
          </li>
        </ul>
        <div className="nav-actions">
          <label className="theme-toggle">
            <input type="checkbox" checked={theme === 'dark'} onChange={onToggleTheme} />
            <span className="slider"></span>
          </label>
          <label htmlFor="nav-toggle-safe" className="menu-btn-safe">
            ☰
          </label>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
