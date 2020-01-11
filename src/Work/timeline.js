import React from 'react';

import Panel from './panel';



const Timeline = (props) => {
  const panels = [
    {logo: 'text:The beginning'},
    ...props.items,
    {logo: 'text:And more to come!'}
  ];

  return (
    <div className='timeline'>
      { panels.map((item, i) =>
        <Panel idx={i} key={i} item={item} />
      )}
    </div>
  )
}

export default Timeline;