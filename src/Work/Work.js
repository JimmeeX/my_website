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
*/

/**
 * TODO: EXPAND on Click or Provide Limited Description
 */

const Work = (props) => {
  const { pageWidth } = props;
  return (
    <div id='work'>
      <Timeline items={jobs} pageWidth={pageWidth} />
    </div>
  );
}

export default Work;