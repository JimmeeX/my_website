import React from 'react';
import { useSpring, animated, config } from 'react-spring';

import { colours as css } from '../data/css';
import { JobItem } from '../data/jobs';

const fadeInoffset = 5; // px from border completion

enum RGB {
  R = 0,
  G = 1,
  B = 2,
}

// Import all files from a directory
/* global __WebpackModuleApi */
const importAll = (r: __WebpackModuleApi.RequireContext) => {
  const files: {
    [index: string]: any;
  } = {};

  r.keys().map((key) => {
    files[key] = r(key);
    return null;
  });
  return files;
};

const files = importAll(
  require.context('../images/journey', false, /\.(png|jpe?g|svg|webp)$/)
);

// Functions for Color Interpolation
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        [RGB.R]: parseInt(result[1], 16),
        [RGB.G]: parseInt(result[2], 16),
        [RGB.B]: parseInt(result[3], 16),
      }
    : null;
};

const interpolateColor = (start: string, stop: string, frac: number) => {
  const rgbStart = hexToRgb(start);
  const rgbStop = hexToRgb(stop);
  if (!rgbStart || !rgbStop) {
    return start;
  }

  // Initialise with default values, assume that these values
  // will always be changed
  const newColor = {
    [RGB.R]: 0,
    [RGB.G]: 0,
    [RGB.B]: 0,
  };

  [RGB.R, RGB.G, RGB.B].forEach((c) => {
    newColor[c] = Math.round(rgbStart[c] + (rgbStop[c] - rgbStart[c]) * frac);
  });
  const newColorString = `rgb(${newColor[RGB.R]},${newColor[RGB.G]},${
    newColor[RGB.B]
  })`;

  return newColorString;
};

type PanelProps = {
  idx: number;
  item: JobItem;
  params: PanelConfig;
  vertHeightCurr: number;
};

export type PanelConfig = {
  start: number;
  size: number;
  border: number;
  shadow: number;
  sep: number;
  length: number;
};

const Panel = (props: PanelProps) => {
  const { accent, accentLight } = css;
  const { item, idx, params, vertHeightCurr } = props;
  const { size, sep, border, shadow, length } = params;
  const { logo, title, company, startDate, endDate, url } = item;

  // Draw Border (Top-Bottom)
  const objectSize = size + 2 * (border + shadow); // Includes borders + shadow
  const objectSep = sep - 2 * (border + shadow); // MarginBottom excludes shadows + borders
  const start = idx * (objectSize + objectSep);

  // How much height should be drawn (border)
  const borderHeight = Math.min(
    Math.max(0, vertHeightCurr - start),
    objectSize
  );

  // Calculate Colour
  const panelHeight = start + objectSize / 2; // Center
  const maxVertHeight = objectSize * length + objectSep * (length - 1);
  const percent = panelHeight / maxVertHeight;
  const newColor = interpolateColor(accent, accentLight, percent);

  // Fade in when 'circle' is complete
  const fadeSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: borderHeight >= objectSize - fadeInoffset ? 1 : 0 },
  });

  // Fade In going Right
  const fadeRightSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(10%)' },
    to:
      borderHeight >= objectSize - fadeInoffset
        ? {
            opacity: 1,
            transform: 'translateX(0px)',
          }
        : { opacity: 0, transform: 'translateX(10%)' },
    config: config.stiff,
  });

  // Fade In going Left
  const fadeLeftSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-10%)' },
    to:
      borderHeight >= objectSize - fadeInoffset
        ? {
            opacity: 1,
            transform: 'translateX(0px)',
          }
        : { opacity: 0, transform: 'translateX(-10%)' },
    config: config.stiff,
  });

  // Handle Center Logo
  const i = logo.indexOf(':');
  const [format, value] = [logo.slice(0, i), logo.slice(i + 1)];

  const logoSection =
    format === 'img' ? (
      <animated.img
        className="panel-logo-img"
        src={files[`./${value}`]}
        alt={value}
        height={size}
        width={size}
        style={{ ...fadeSpring, cursor: 'pointer' }}
        onClick={() => {
          window.open(url, '_blank');
        }}
      />
    ) : (
      <animated.div
        className="panel-logo-text"
        style={{
          ...fadeSpring,
          height: `${size}px`,
          width: `${size}px`,
        }}
      >
        {value}
      </animated.div>
    );

  // Handle Side Section
  const dateString = startDate && endDate ? `${startDate} - ${endDate}` : '';

  const panelSection = (
    <>
      <div className="panel-title">{title}</div>
      <div className="panel-company">{company}</div>
      <div className="panel-date">
        <i>{dateString}</i>
      </div>
    </>
  );

  return (
    <div
      id={idx === 0 ? 'top-panel' : ''}
      className="timeline-panel"
      style={{
        marginBottom: idx === length - 1 ? `50px` : `${sep}px`,
        height: `${size}px`,
      }}
    >
      {idx % 2 === 1 ? (
        <animated.div
          className="panel-section-left"
          style={{
            ...fadeRightSpring,
            height: `${size}px`,
          }}
        >
          {panelSection}
        </animated.div>
      ) : (
        <div />
      )}
      <div className="panel-section-center" style={{ height: `${size}px` }}>
        <div
          className="panel-logo-border-wrapper"
          style={{
            height: `${size + 2 * (border + shadow)}px`,
            width: `${size + 2 * (border + shadow)}px`,
          }}
        >
          <div // Hide Vertline from ever appearing
            className="panel-logo-border-hide"
            style={{
              height: `${size + 2 * (border + shadow)}px`,
              width: `${size + 2 * (border + shadow)}px`,
              backgroundColor: `white`,
            }}
          />
          <div // Use overflow to create draw border effect
            className="panel-logo-border-show"
            style={{
              height: `${borderHeight}px`,
              width: `${size + 2 * (border + shadow)}px`,
              overflowY: 'hidden',
            }}
          >
            <div
              className="panel-logo-border"
              style={{
                height: `${size}px`,
                width: `${size}px`,
                border: `${border}px solid white`,
                boxShadow: `0 0 0 ${shadow}px ${newColor}`,
              }}
            />
          </div>
        </div>
        {logoSection}
      </div>
      {idx % 2 === 0 ? (
        <animated.div
          className="panel-section-right"
          style={{
            ...fadeLeftSpring,
            height: `${size}px`,
          }}
        >
          {panelSection}
        </animated.div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Panel;
