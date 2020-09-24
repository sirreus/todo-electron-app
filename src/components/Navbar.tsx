import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar: React.FC = () => (
  <nav>
    <div className="nav-wrapper indigo lighten-4 px1">
      <a href="/" className="brand-logo">
        What to do?...!
      </a>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/">Todo list</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navbar
