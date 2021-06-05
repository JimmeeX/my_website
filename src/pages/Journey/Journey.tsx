import React from 'react';

import Button from '../../components/Button';
import Timeline from '../../components/Timeline';

import jobs from '../../data/jobs';

const Journey = () => (
  <section id="journey" className="page-fill">
    <div id="journey-header" className="header">
      My Journey so Far
    </div>
    <div id="journey-timeline">
      <Timeline items={jobs} />
    </div>
    <Button
      id="journey-button"
      large
      text="Learn more on LinkedIn"
      url="https://www.linkedin.com/in/jameslin1997/"
    />
  </section>
);

export default Journey;
