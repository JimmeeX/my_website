import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import useMeasure from 'react-use-measure';

import Panel from './panel';

const Timeline = (props) => {
  const { items } = props;

  const [pageWidth, setPageWidth] = useState(document.body.offsetWidth);

  const panels = [
    {logo: 'text:The Beginning'},
    ...items,
    {logo: 'text:More to Come!'}
  ];

  let params;
  if (pageWidth <= 700) {
    params = {
      start: 50, // Start of first panel from top (px)
      size: 100,  // Size of panel-logo (px)
      border: 5,  // px
      shadow: 10, // px
      sep: 200,   // Distance between two panel-logos (px)
      length: panels.length
    }
  }
  else {
    params = {
      start: 50, // Start of first panel from top (px)
      size: 150,  // Size of panel-logo (px)
      border: 5,  // px
      shadow: 10, // px
      sep: 200,   // Distance between two panel-logos (px)
      length: panels.length
    }
  }

  const { start, size, border, shadow, sep } = params;

  const [vertLineRef, vertLineBounds] = useMeasure();
  const vertHeightCurr = vertLineBounds.height;
  const [percentScrolled, setPercentScrolled] = useState(0);

  const timelineRef = useRef();

  const scrollCallback = () => {
      // Get Percent Scrolled
      const el = timelineRef.current;
      if (el == null) return;

      const bounds = el.getBoundingClientRect();
      const { top, height } = bounds; // Pixel distance from top of timeline element to top of page
      const startOffset = window.innerHeight + start;
      const currHeight = top * -1 + startOffset;

      const percent = Math.min(Math.max(0, currHeight) / height, 1);
      setPercentScrolled(percent);
  };

  useEffect(() => {
    // Create Callback on Scroll Event
    document.addEventListener("scroll", scrollCallback);
    window.addEventListener('resize', () => setPageWidth(document.body.offsetWidth));

    return () => {
      document.removeEventListener("scroll", scrollCallback);
      window.removeEventListener('resize', () => setPageWidth(document.body.offsetWidth));
    }
  }, []);

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
    <div className='timeline' ref={timelineRef}>
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
        }}
        ref={vertLineRef}
      />
    </div>
  )
}

export default Timeline;