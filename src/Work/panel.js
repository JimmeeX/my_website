import React from 'react';

const Panel = (props) => {
  const { item } = props;

  const dateString = (item.startDate && item.endDate) ? `${item.startDate} - ${item.endDate}` : '';
  return (
    <div className='timeline-panel'>
      <div className='panel-logo-wrapper'>
        <div className='panel-logo'>{item.logo}</div>
      </div>
      <div className='panel-section'>
        <div className='panel-title'>{item.title}</div>
        <div className='panel-company'>{item.company}</div>
        <div className='panel-date'>{dateString}</div>
        <div className='panel-description'>{item.description}</div>
      </div>
    </div>
  )
};

export default Panel;