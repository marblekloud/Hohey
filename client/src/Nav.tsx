import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <> 
      <div className="topnav">
        <li className = "list"><Link to="/">
          Home
        </Link>
        </li>
        <li className = "list"><Link to="/upload">
          Upload video
        </Link>
        </li>
        <li className = "listright"><Link to="/connectwallet">
          Connect wallet
        </Link>
        </li>
     </div>
    </>
  );
}

export default Nav;
