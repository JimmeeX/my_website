import React, { Fragment } from 'react';

// Import all files from a directory
const importAll = (r) => {
  const files = {};

  r.keys().map(key => {
    files[key] = r(key)
    return null;
  })
  return files;
};

const files = importAll(require.context('../images/work', false, /\.(png|jpe?g|svg)$/));


const Panel = (props) => {
  const { item, idx } = props;
  const { logo, title, company, startDate, endDate, description } = item;

  // Handle Center Logo
  const i = logo.indexOf(':');
  const [format, value] = [logo.slice(0,i), logo.slice(i+1)];

  const logoSection =
    format === 'img' ? (
      <div className='panel-logo'>
        <img className='panel-logo-img' src={files[`./${value}`]}></img>
      </div>
    ) : (
      <div className='panel-logo'>{value}</div>
    )

  // Handle Side Section
  const dateString = (startDate && endDate) ? `${startDate} - ${endDate}` : '';

  const panelSection = (
    <Fragment>
      <div className='panel-title'><b>{title}</b></div>
      <div className='panel-company'>{company}</div>
      <div className='panel-date'><i>{dateString}</i></div>
      <div className='panel-description'>{description}</div>
    </Fragment>
  );

  return (
    <div className='timeline-panel'>
      { idx % 2 === 1 ?
        <div className='panel-section-left'>
          {panelSection}
        </div>
        :
        <div></div>
      }
      <div className='panel-section-center'>
        {logoSection}
      </div>
      { idx % 2 === 0 ?
        <div className='panel-section-right'>
          {panelSection}
        </div>
        :
        <div></div>
      }
    </div>
  )
};

export default Panel;