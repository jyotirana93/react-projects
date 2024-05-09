import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
const MainLayout = () => {
  const linkActiveStyle = {
    textDecoration: 'underline',
    fontSize: '1rem',
    color: 'green',
  };
  const isAuth = false;

  return (
    <>
      {isAuth ? (
        <header
          style={{ background: '#383838', padding: '1.5rem', margin: 'auto' }}
        >
          <nav>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : 'non-active')}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              to="admin"
              className={({ isActive }) => (isActive ? 'active' : 'non-active')}
            >
              Admin
            </NavLink>
            <NavLink
              to="login"
              className={({ isActive }) => (isActive ? 'active' : 'non-active')}
            >
              Login
            </NavLink>
            <NavLink
              to="student"
              className={({ isActive }) => (isActive ? 'active' : 'non-active')}
            >
              Student
            </NavLink>
          </nav>
        </header>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default MainLayout;
