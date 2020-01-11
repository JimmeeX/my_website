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
      <img className='panel-logo-img' src={files[`./${value}`]} alt={value}></img>
    ) : (
      <div className='panel-logo-text-wrapper'>{value}</div>
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
    <div id={idx === 0 ? 'top-panel': ''} className='timeline-panel'>
      { idx % 2 === 1 ?
        <div
          className='panel-section-left'
          data-aos='fade-left'
          data-aos-offset='400'
          data-aos-duration='1000'
          // data-aos-anchor-placement='top-center'
          // data-aos-anchor='#top-panel'
        >
          {panelSection}
        </div>
        :
        <div></div>
      }
      <div
        className='panel-section-center'
        data-aos='fade-up'
        // data-aos-offset='0'
        data-aos-duration='1000'
        // data-aos-anchor='#top-panel'

      >
        {logoSection}
      </div>
      { idx % 2 === 0 ?
        <div
          className='panel-section-right'
          data-aos='fade-right'
          data-aos-offset='400'
          data-aos-duration='1000'
          // data-aos-anchor='#top-panel'

        >
          {panelSection}
        </div>
        :
        <div></div>
      }
    </div>
  )
};

export default Panel;