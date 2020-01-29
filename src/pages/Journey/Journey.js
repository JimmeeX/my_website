import React from 'react';

import Button from '../../components/button';
import Timeline from '../../components/timeline';

import jobs from '../../data/jobs';

const Journey = () => {
  return (
    <div id='journey' className='page-fill'>
        <div id='journey-header' className='header'>My Journey so Far</div>
        <div id='journey-timeline'>
          <Timeline items={jobs} />
        </div>
        <Button
          id='journey-button'
          large
          text={'Learn more on LinkedIn'}
          url={'https://www.linkedin.com/in/jameslin1997/'}
        />
    </div>
  );
}

export default Journey;