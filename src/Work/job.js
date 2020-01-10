import React from 'react';

const Job = (props) => {
  return (
    <div className='job'>
      <div className='job-title'>{props.title}</div>
      <div className='job-company'>{props.company}</div>
      <div className='job-date'>{props.startDate} - {props.endDate}</div>
      <div className='job-description'>{props.description}</div>
    </div>
  )
}

export default job;