import React, { Fragment } from 'react';

import { useSpring, animated, config } from 'react-spring';

import { bg } from '../data/css';

const fadeInoffset = 5; // px from border completion

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
  const { item, idx, params, vertHeightCurr } = props;
  const { size, sep, border, shadow, color } = params;
  const { logo, title, company, startDate, endDate, description } = item;

  // Draw Border (Top-Bottom)
  const objectSize = size + 2 * (border + shadow) // Includes borders + shadow
  const objectSep = sep - 2 * (border + shadow)   // MarginBottom excludes shadows + borders
  const start = idx * (objectSize + objectSep);

  // How much height should be drawn (border)
  const borderHeight = Math.min(Math.max(0, vertHeightCurr - start), objectSize);

  // Fade in when 'circle' is complete
  const fadeSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: borderHeight >= objectSize - fadeInoffset ? 1 : 0 }
  });

  // Fade In going Right
  const fadeRightSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(10%)' },
    to: borderHeight >= objectSize - fadeInoffset ? {
      opacity: 1,
      transform: 'translateX(0px)'
    } : { opacity: 0, transform: 'translateX(10%)' },
    config: config.stiff
  });

  // Fade In going Left
  const fadeLeftSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-10%)' },
    to: borderHeight >= objectSize - fadeInoffset ? {
      opacity: 1,
      transform: 'translateX(0px)'
    } : { opacity: 0, transform: 'translateX(-10%)' },
    config: config.stiff
  });

  // Handle Center Logo
  const i = logo.indexOf(':');
  const [format, value] = [logo.slice(0,i), logo.slice(i+1)];

  const logoSection =
    format === 'img' ? (
      <animated.img
        className='panel-logo-img'
        src={files[`./${value}`]}
        alt={value}
        height={size}
        width={size}
        style={fadeSpring}
      />
    ) : (
      <animated.div
        className='panel-logo-text'
        style={{
          ...fadeSpring,
          height: `${size}px`,
          width: `${size}px`
        }}
      >
        {value}
      </animated.div>
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
    <div
      id={idx === 0 ? 'top-panel': ''}
      className='timeline-panel'
      style={{ marginBottom: `${sep}px` }}
    >
      { idx % 2 === 1 ?
        <animated.div
          className='panel-section-left'
          style={fadeRightSpring}
        >
          {panelSection}
        </animated.div>
        :
        <div></div>
      }
      <div className='panel-section-center'>
        <div
          className='panel-logo-border-wrapper'
          style={{
            height: `${size + 2 * (border + shadow)}px`,
            width: `${size + 2 * (border + shadow)}px`
          }}
        >
          <div
            className='panel-logo-border-show'
            style={{
              height: `${borderHeight}px`,
              width: `${size + 2 * (border + shadow)}px`,
              overflowY: 'hidden'
            }}
          >
            <div
              className='panel-logo-border'
              style={{
                height: `${size}px`,
                width: `${size}px`,
                border: `${border}px solid ${bg.work}`,
                boxShadow: `0 0 0 ${shadow}px ${color},
                            inset 0 0 0 ${size / 2}px ${bg.work}`,

              }}
            />
          </div>
        </div>
        {logoSection}
      </div>
      { idx % 2 === 0 ?
        <animated.div
          className='panel-section-right'
          style={fadeLeftSpring}
        >
          {panelSection}
        </animated.div>
        :
        <div></div>
      }
    </div>
  )
};

export default Panel;