import React from 'react';

import Timeline from './timeline';

import jobs from '../data/jobs';

/*
TODO:
  - Tree Animation (growing upwards)
  - Work Experience
    - Date (Start - End)
    - Title
    - Company
    - Description
    - Employment Type?
    - Location?
    - Links/Pics/Media?? Not sure
    - Logo?
    - Left/Right?
*/

const Work = (props) => {
  return (
    <div id='work'>
      <Timeline items={jobs} />
    </div>
  );
}

export default Work;