import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSpring, animated, config } from 'react-spring';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight'
      const percentScrolled = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
      setShowHeader(percentScrolled === 0);
    });
  }, []);

  // Animation: Slide out when page is scrolled
  const headerSpring = useSpring({
    transform: showHeader ? 'translateY(0px)' : 'translateY(-150%)'
  }, config.molasses);

  return (
    <animated.div id='header' style={headerSpring}>
      <ul id='header-nav'>
        <Link to='/' className='header-nav-link'><li id='header-nav-home' className='header-nav-item'>Home</li></Link>
        <Link to='/work' className='header-nav-link'><li id='header-nav-work' className='header-nav-item'>Work</li></Link>
        <Link to='/projects' className='header-nav-link'><li id='header-nav-projects' className='header-nav-item'>Projects</li></Link>
      </ul>
    </animated.div>
  )
};

export default Header;
