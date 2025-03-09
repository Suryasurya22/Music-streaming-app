import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import { FaHome, FaHeart, FaList } from 'react-icons/fa'; // Add the required icons
import './sidebar.css'; // New CSS file for the top bar

const TopBar = () => {
  return (
    <nav className="topbar">
      <div className="logo">
        <strong>2k_tunes</strong>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/songs">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/favorities">
            <FaHeart /> Favorites
          </Link>
        </li>
        <li>
          <Link to="/playlist">
            <FaList /> Playlist
          </Link>
        </li>
      </ul>
      
    </nav>
  );
};

export default TopBar;
