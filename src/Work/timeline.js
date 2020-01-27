import React, { useState, useEffect } from 'react';

import Panel from './panel';
import { useSpring, animated, config } from 'react-spring';
import useMeasure from 'react-use-measure';

// const params = {
//   start: 450, // Start of first panel from top (px)
//   size: 150,  // Size of panel-logo (px)
//   border: 5,  // px
//   shadow: 10, // px
//   sep: 200,   // Distance between two panel-logos (px)
//   color: 'brown' // Colour of Vertline
// }

const Timeline = (props) => {
  const { items, pageWidth } = props;

  let params;
  if (pageWidth <= 700) {
    params = {
      start: 450, // Start of first panel from top (px)
      size: 75,  // Size of panel-logo (px)
      border: 5,  // px
      shadow: 10, // px
      sep: 200,   // Distance between two panel-logos (px)
      color: 'brown' // Colour of Vertline
    }
  }
  else {
    params = {
      start: 450, // Start of first panel from top (px)
      size: 150,  // Size of panel-logo (px)
      border: 5,  // px
      shadow: 10, // px
      sep: 200,   // Distance between two panel-logos (px)
      color: 'brown' // Colour of Vertline
    }
  }

  const { start, size, border, shadow, sep, color } = params;

  const [vertLineRef, bounds] = useMeasure();
  const vertHeightCurr = bounds.height;
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
    // Create Callback on Scroll Event
    document.addEventListener("scroll", scrollCallback);

    return () => {
      document.removeEventListener("scroll", scrollCallback);
    }
  }, []);

  const panels = [
    {logo: 'text:The Beginning'},
    ...items,
    {logo: 'text:More to Come!'}
  ];

  // Calculate properties of the vertLine
  // Distance from top of first Panel to top of bottom of Last Panel
  const objectSize = size + 2 * (border + shadow) // Includes borders + shadow
  const objectSep = sep - 2 * (border + shadow)   // MarginBottom excludes shadows + borders
  const maxVertHeight = objectSize * panels.length + objectSep * (panels.length - 1);
  const startVertHeight = objectSize;
  const vertHeight = Math.max(startVertHeight, maxVertHeight * percentScrolled);

  const vertTop = start - (border + shadow);

  // Smooth Animation of vertLine
  const vertSpring = useSpring({
    from: { height: 0 },
    to: { height: vertHeight },
    config: config.molasses
  });

  return (
    <div className='timeline'>
      <div className='timeline-panels' style={{ marginTop: `${start}px` }}>
        { panels.map((item, i) =>
          <Panel idx={i} key={i} item={item} params={params} vertHeightCurr={vertHeightCurr} />
        )}
      </div>
      <animated.div
        className='timeline-vertline'
        style={{
          ...vertSpring,
          top: `${vertTop}px`,
          backgroundColor: color
        }}
        ref={vertLineRef}
      />
    </div>
  )
}

export default Timeline;