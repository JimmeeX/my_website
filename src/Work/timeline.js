import React, { useCallback } from 'react';

import Panel from './panel';
// import Progress from './progress';
import { useSpring } from 'react-spring';

// TODO: Progress bar

const Timeline = (props) => {
  const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));

  const onScroll = useCallback(e => set({st: e.target.scrollTop}), []);

  console.log(st, xy);

  const panels = [
    {logo: 'text:The Beginning'},
    ...props.items,
    {logo: 'text:More to Come!'}
  ];

  return (
    <div className='timeline' onScroll={onScroll}>
      <div className='timeline-panels'>
        { panels.map((item, i) =>
          <Panel idx={i} key={i} item={item} />
        )}
      </div>
      <div className='timeline-vertline'>Hello</div>
    </div>
  )
}

export default Timeline;