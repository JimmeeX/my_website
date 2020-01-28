import React from 'react';

import Timeline from '../../components/timeline';

import jobs from '../../data/jobs';

const Journey = () => {
  return (
    <div id='journey' className='page-fill'>
        <div id='journey-header' className='header'>My Journey so Far</div>
        <div id='journey-timeline'>
          <Timeline items={jobs} />
        </div>
    </div>
  );
}

export default Journey;