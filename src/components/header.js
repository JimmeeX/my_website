import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSpring, animated, config } from 'react-spring';

import { bg } from '../data/css';

const headerItems = ['home', 'work', 'projects'];

// TODO: FIX ISSUE WITH STACKING CONTEXT TRANSLATE

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
  const hoverInvertSpring = {
    'home': useSpring({
      backgroundColor: hoverItem === 'home' ? 'white': bg['home'],
    }),
    'work': useSpring({
      backgroundColor: hoverItem === 'work' ? 'white': bg['work'],
    }),
    'projects': useSpring({
      backgroundColor: hoverItem === 'projects' ? 'white': bg['projects'],
    })
  }

  // Animation: Expand Colour Circle on Hover
  const hoverScaleSpring = {
    'home': useSpring({
      transform: hoverItem === 'home' ? `scale(8)` : `scale(1)`
    }),
    'work': useSpring({
      transform: hoverItem === 'work' ? `scale(8)` : `scale(1)`
    }),
    'projects': useSpring({
      transform: hoverItem === 'projects' ? `scale(8)` : `scale(1)`
    })
  }

  // Transition Animation: Expand Circle to Cover the Screen
  const showActiveSpring = {
    'home': useSpring({
      transform: activeItem === 'home' ? 'translateY(50%)' : 'translateY(0px)'
    }),
    'work': useSpring({
      transform: activeItem === 'work' ? `translateY(50%)` : `translateY(0px)`
    }),
    'projects': useSpring({
      transform: activeItem === 'projects' ? `translateY(50%)` : `translateY(0px)`
    })
  }

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
              style={showActiveSpring[item]}
            >
              <AnimatedLink
                to={item === 'home' ? '/' : `/${item}`}
                id={`header-nav-${item}`}
                className='header-nav-link'
                style={hoverInvertSpring[item]}
                onMouseEnter={() => setHoverItem(item)}
                onMouseLeave={() => setHoverItem(null)}
                onClick={() => setActiveItem(item)}
              >
                <li className='header-nav-item'>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
              </AnimatedLink>
              <animated.div
                className='header-nav-circle'
                style={{
                  ...hoverScaleSpring[item],
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
