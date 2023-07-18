import * as React from 'react';
import { NavLink } from 'react-router-dom';
//import { useAuth } from '../auth/AuthContext';



export default function Menu() {
  const activeStyles = {
    color: 'lightgreen',
  };

  //const { currentUser, logout } = useAuth();

  /* async function handleLogout() {
    try {
      await logout();
    } catch {
      console.log('Failed to log out');
    }
  } */

  return (
    <div className="menu">
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Home
        </NavLink>

        <NavLink
          to="login"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Login
        </NavLink>
        <NavLink
          to="board"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
         Board
        </NavLink>
      </nav>
    </div>
  );
}
