import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => (
  <nav className="nav-header">
    <div className="nav-content">
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/plan" className="nav-link">
            Plan
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-desktop-btn">
        Logout
      </button>
    </div>
  </nav>
);
export default Header;
