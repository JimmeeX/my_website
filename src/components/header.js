import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSpring, animated, config } from 'react-spring';

import { bg } from '../data/css';

const headerItems = ['home', 'work', 'projects'];

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [hoverItem, setHoverItem] = useState(null);

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
  const headerScrollSpring = useSpring({
    transform: showHeader ? 'translateY(0px)' : 'translateY(-150%)'
  }, config.molasses);

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

  const hoverScaleSpring = {
    'home': useSpring({
      transform: hoverItem === 'home' ? `scale(4)` : `scale(1)`
    }),
    'work': useSpring({
      transform: hoverItem === 'work' ? `scale(4)` : `scale(1)`
    }),
    'projects': useSpring({
      transform: hoverItem === 'projects' ? `scale(4)` : `scale(1)`
    })
  }

  const AnimatedLink = animated(Link);

  return (
    <animated.div id='header' style={headerScrollSpring}>
      <ul id='header-nav'>
        {
          headerItems.map((item, i) =>
            <div
              id={`header-nav-wrapper-${item}`}
              className='header-nav-item-wrapper'
              onMouseEnter={() => setHoverItem(item)}
              onMouseLeave={() => setHoverItem(null)}
              key={i}
            >
              <AnimatedLink
                to={item === 'home' ? '/' : `/${item}`}
                id={`header-nav-${item}`}
                className='header-nav-link'
                style={hoverInvertSpring[item]}
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
            </div>
          )
        }
      </ul>
    </animated.div>
  )
};

export default Header;
