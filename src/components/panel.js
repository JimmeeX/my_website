import React, { Fragment } from 'react';
import { useSpring, animated, config } from 'react-spring';

import { colours as css } from '../data/css';

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

/**Functions for Color Interpolation */
const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const interpolateColor = (start, stop, frac) => {
  const rgbStart = hexToRgb(start);
  const rgbStop = hexToRgb(stop);

  const newColor = {};
  ['r', 'g', 'b'].forEach(c => {
    newColor[c] = Math.round(rgbStart[c] + (rgbStop[c] - rgbStart[c]) * frac);
  });
  const { r, g, b } = newColor;
  const newColorString = `rgb(${r},${g},${b})`;

  return newColorString;
};

const Panel = (props) => {
  const { accent, accent_light } = css;
  const { item, idx, params, vertHeightCurr } = props;
  const { size, sep, border, shadow, length } = params;
  const { logo, title, company, startDate, endDate } = item;

  // Draw Border (Top-Bottom)
  const objectSize = size + 2 * (border + shadow) // Includes borders + shadow
  const objectSep = sep - 2 * (border + shadow)   // MarginBottom excludes shadows + borders
  const start = idx * (objectSize + objectSep);

  // How much height should be drawn (border)
  const borderHeight = Math.min(Math.max(0, vertHeightCurr - start), objectSize);

  // Calculate Colour
  const panelHeight = start + (objectSize / 2) // Center
  const maxVertHeight = objectSize * length + objectSep * (length - 1);
  const percent = panelHeight / maxVertHeight;
  const newColor = interpolateColor(accent, accent_light, percent);

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
      <div className='panel-title'>{title}</div>
      <div className='panel-company'>{company}</div>
      <div className='panel-date'><i>{dateString}</i></div>
    </Fragment>
  );

  return (
    <div
      id={idx === 0 ? 'top-panel': ''}
      className='timeline-panel'
      style={{
        marginBottom: `${sep}px`,
        height: `${size}px`
      }}
    >
      { idx % 2 === 1 ?
        <animated.div
          className='panel-section-left'
          style={{
            ...fadeRightSpring,
            height: `${size}px`
          }}
        >
          {panelSection}
        </animated.div>
        :
        <div></div>
      }
      <div className='panel-section-center' style={{ height: `${size}px` }}>
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
                border: `${border}px solid white`,
                boxShadow: `0 0 0 ${shadow}px ${newColor},
                            inset 0 0 0 ${size / 2}px white`,

              }}
            />
          </div>
        </div>
        {logoSection}
      </div>
      { idx % 2 === 0 ?
        <animated.div
          className='panel-section-right'
          style={{
            ...fadeLeftSpring,
            height: `${size}px`
          }}
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