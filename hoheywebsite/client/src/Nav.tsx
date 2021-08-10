import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <> 
      <div className="topnav">
        <Link to="/">
          Home
        </Link>
        <Link to="/upload">
          Demo
        </Link>
        <Link to="/uploadpage">
          Upload video
        </Link>
        <Link to="/videolist">
          Video list
        </Link>
     </div>
    </>
  );
}

export default Nav;
