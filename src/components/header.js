import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSpring, useSprings, animated, config } from 'react-spring';

import { bg } from '../data/css';

const headerItems = ['home', 'work', 'projects'];

const Header = () => {
  const pathRegex = /\/(\w+)/;
  const firstPath = pathRegex.exec(window.location.pathname);
  const currPath = firstPath ? firstPath[1] : 'home';

  const [showHeader, setShowHeader] = useState(true);
  const [hoverItem, setHoverItem] = useState(null);
  const [activeItem, setActiveItem] = useState(currPath);

  const scrollCallback = () => {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight'
    const percentScrolled = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
    setShowHeader(percentScrolled === 0);
};

  useEffect(() => {
    document.addEventListener("scroll", scrollCallback);

    return () => {
      document.removeEventListener("scroll", scrollCallback);
    }
  }, []);

  // Animation: Slide out when page is scrolled
  const headerScrollSpring = useSpring({
    transform: showHeader ? 'translateY(0px)' : 'translateY(-300%)'
  }, config.molasses);

  // Animation: Invert Circle Colour on Hover
  const hoverInvertSprings = useSprings(headerItems.length,
    headerItems.map(item => ({
      backgroundColor: hoverItem === item ? 'white': bg[item],
    }))
  );

  // Animation: Expand Colour Circle on Hover
  const hoverScaleSprings = useSprings(headerItems.length,
    headerItems.map(item => ({
      transform: hoverItem === item ? 'scale(8)' : 'scale(1)'
    }))
  );

  // Animation: Show Active Menu Item
  const showActiveSprings = useSprings(headerItems.length,
    headerItems.map(item => ({
      transform: activeItem === item ? `translate3d(0px,50%,0px)` : `translate3d(0px,0px,0px)`
    }))
  );

  const AnimatedLink = animated(Link);

  return (
    <animated.div id='header' style={headerScrollSpring}>
      <ul id='header-nav'>
        {
          headerItems.map((item, i) =>
            <animated.div
              id={`header-nav-wrapper-${item}`}
              className='header-nav-item-wrapper'
              key={i}
              style={{
                ...showActiveSprings[i],
                zIndex: `${hoverItem === item ? 0 : 1}` // Stacking Index Hack
              }}
            >
              <AnimatedLink
                to={item === 'home' ? '/' : `/${item}`}
                id={`header-nav-${item}`}
                className='header-nav-link'
                style={hoverInvertSprings[i]}
                onMouseEnter={() => setHoverItem(item)}
                onMouseLeave={() => setHoverItem(null)}
                onClick={() => setActiveItem(item)}
              >
                <li className='header-nav-item'>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
              </AnimatedLink>
              <animated.div
                className='header-nav-circle'
                style={{
                  ...hoverScaleSprings[i],
                  backgroundColor: `${bg[item]}`
                }}
              />
            </animated.div>
          )
        }
      </ul>
    </animated.div>
  )
};

export default Header;
