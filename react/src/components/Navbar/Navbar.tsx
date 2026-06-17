import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.tsx';

function Navbar() {
  const { theme } = useTheme();

  return <nav className={theme === "dark" ? "navbar dark" : "navbar light"}>
    <Link className="nav-link text" to={'/home'}>Home</Link>
    <Link className="nav-link text" to={'/counter'}>Counter</Link>
  </nav>;
}

export default Navbar;