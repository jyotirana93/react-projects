import { NavLink } from 'react-router-dom';
import './SideNav.css';

const SideNav = () => {
  return (
    <aside className="side-bar">
      <div className="side-bar-container">
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          to="/add-users"
        >
          Add Users
        </NavLink>
      </div>
    </aside>
  );
};

export default SideNav;
