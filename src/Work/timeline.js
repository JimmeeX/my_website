import React, { useState, useEffect } from 'react';

import Panel from './panel';
import { useSpring, animated, config } from 'react-spring';

const start = 450;  // Start of first panel from top (px)
const height = 150; // Size of panel-logo (px)
const sep = 200;    // Distance between two panel-logos (px)

const Timeline = (props) => {
  const [percentScrolled, setPercentScrolled] = useState(0);

  const scrollCallback = () => {
      // Get Percent Scrolled
      // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript )
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight'
      const percentScrolled = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
      setPercentScrolled(percentScrolled);
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollCallback);

    return () => {
      document.removeEventListener("scroll", scrollCallback);
    }
  }, []);

  const panels = [
    {logo: 'text:The Beginning'},
    ...props.items,
    {logo: 'text:More to Come!'}
  ];

  // Calculate properties of the vertLine
  const maxVertHeight = start + (height + sep) * (panels.length - 1) - (height * 2);
  const vertTop = start + height;
  const vertHeight = maxVertHeight * percentScrolled;

  // Smooth Animation of vertLine
  const vertSpring = useSpring({ height: vertHeight, config: config.molasses });

  return (
    <div className='timeline'>
      <div className='timeline-panels' style={{ marginTop: `${start}px` }}>
        { panels.map((item, i) =>
          <Panel idx={i} key={i} item={item} height={height} sep={sep} />
        )}
      </div>
      <animated.div
        className='timeline-vertline'
        style={{
          ...vertSpring,
          top: `${vertTop}px`,
        }}
      />
    </div>
  )
}

export default Timeline;