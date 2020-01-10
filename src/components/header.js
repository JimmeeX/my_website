import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <div id='header'>
    <ul id='header-nav'>
      <li><Link to="/" className='header-nav-item' >Home</Link></li>
      <li><Link to="/work" className='header-nav-item'>Work</Link></li>
      <li><Link to="/projects" className='header-nav-item'>Projects</Link></li>
    </ul>
  </div>
);

export default Header;
