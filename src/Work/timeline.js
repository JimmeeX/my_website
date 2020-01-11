import React from 'react';

import Panel from './panel';



const Timeline = (props) => {
  return (
    <div className='timeline'>
      <Panel item={{logo: 'The beginning'}} />
      { props.items.map((item, i) =>
        <Panel key={i+1} item={item} />
      )}
      <Panel item={{logo: 'And more to come!'}} />
    </div>
  )
}

export default Timeline;