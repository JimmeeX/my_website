import React, { Fragment, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSpring, useSprings, animated, config } from 'react-spring';

import { bg } from '../data/css';

const translateY = 'translateY(50%)';

const Header = (props) => {
  const { headerDetails, headerPos } = props;
  const { items, top, size, spacing } = headerDetails;

  const [activeItem, setActiveItem] = props.active;
  const [showHeader, setShowHeader] = useState(true);
  const [hoverItem, setHoverItem] = useState(null);

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
  const hoverInvertSprings = useSprings(items.length,
    items.map(item => ({
      backgroundColor: (hoverItem === item || activeItem === item) ? 'white': bg[item],
    }))
  );

  // Animation: Expand Colour Circle on Hover
  const hoverScaleSprings = useSprings(items.length,
    items.map(item => ({
      transform:
        activeItem === item ? `scale(1) ${translateY}`
          : hoverItem === item ? 'scale(8) translateY(0px)': 'scale(1) translateY(0px)'
    }))
  );

  // On Click Header Item
  const activeScaleSprings = useSprings(items.length,
    items.map(item => ({
      transform: activeItem === item ? `scale(100) translateY(1%)`: 'scale(1) translateY(0px)',
      config: { mass: 1, tension: 300, friction: 500 },
    }))
  );

  // Animation: Show Active Menu Item
  const showActiveSprings = useSprings(items.length,
    items.map(item => ({
      transform: activeItem === item ? `${translateY}` : 'translateY(0px)'
    }))
  );

  const AnimatedLink = animated(Link);

  return (
    <animated.div
      id='header'
      style={{
        ...headerScrollSpring,
        top: `${top}px`
      }}>
      <ul id='header-nav' style={{ justifyContent: spacing }}>
        {
          items.map((item, i) =>
            <Fragment
              key={i}
            >
              <animated.div
                id={`header-nav-wrapper-${item}`}
                className='header-nav-item-wrapper'
                style={showActiveSprings[i]}
              >
                <AnimatedLink
                  to={item === 'home' ? '/' : `/${item}`}
                  id={`header-nav-${item}`}
                  className='header-nav-link'
                  style={{
                    ...hoverInvertSprings[i],
                    width: `${size}px`,
                    height: `${size}px`
                  }}
                  onMouseEnter={() => setHoverItem(item)}
                  onMouseLeave={() => setHoverItem(null)}
                  onClick={() => setActiveItem(item)}
                >
                  <li className='header-nav-item'>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
                </AnimatedLink>
              </animated.div>
              <animated.div
                className='header-nav-circle'
                style={{
                  ...hoverScaleSprings[i],
                  left: headerPos[item].left,
                  backgroundColor: `${bg[item]}`,
                  width: `${size}px`,
                  height: `${size}px`,
                  zIndex: hoverItem === item ? -50 : -49
                }}
              />
              <animated.div
                className='header-nav-circle-large'
                style={{
                  ...activeScaleSprings[i],
                  left: headerPos[item].left,
                  backgroundColor: `${bg[item]}`,
                  width: `${size}px`,
                  height: `${size}px`,
                  zIndex: activeItem === item ? -99 : -100
                }}
              />
            </Fragment>
          )
        }
      </ul>
    </animated.div>
  )
};

export default Header;
