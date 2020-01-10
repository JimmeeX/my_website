import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <div id='header'>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/work">Work</Link></li>
      <li><Link to="/projects">Projects</Link></li>
    </ul>
  </div>
);

export default Header;
