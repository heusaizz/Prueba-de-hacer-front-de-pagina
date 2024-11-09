import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/admin">Admin Dashboard</Link></li>
        <li><Link to="/professor">Professor Dashboard</Link></li>
        <li><Link to="/client">Client Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;