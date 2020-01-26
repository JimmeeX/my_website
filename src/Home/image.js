import React from 'react';

import { useSpring, useSprings, animated } from 'react-spring';
import SVG from 'react-inlinesvg';

/**
 * TODO: ANIMATED TRAIL POP IN FOR ALL SVGS (TRY SCALE; HEIGHT)
 * TODO: ANIMATE POP IN WITH DURATION
*/

const images = {
  boy: { height: 300, top: 0, left: 150, delay: 1000 },
  browser: { height: 200, top: 100, left: 300, delay: 6000 },
  cloud: { height: 75, top: 65, left: 0, delay: 0 },
  cog: { height: 45, top: 90, left: 70, delay: 0 },
  database: { height: 150, top: 150, left: 0, delay: 0 }
};

const imageNames = Object.keys(images);

const importFiles = (r) => {
  const regex = /\.\/(.*)\.svg$/;
  r.keys().map(key => {
    const match = regex.exec(key);
    const baseFile = match[1];
    images[baseFile].src = r(key);
    return null;
  })
};

importFiles(require.context('../images/home', true, /\.svg$/));

const Image = (props) => {
  const { duration } = props;

  const popSprings = useSprings(imageNames.length,
    imageNames.map(name => ({
      from: { height: '0px' },
      to: { height: `${images[name].height}px` },
      delay: images[name].delay
    }))
  );

  const AnimatedSVG = animated(SVG);

  return (
    <div className='image'>
      {/* <div className='image-wrapper'> */}
        {imageNames.map((name, i) => {
          return (
            <AnimatedSVG
              src={images[name].src}
              key={i}
              style={{
                ...popSprings[i],
                position: 'absolute',
                top: images[name].top,
                left: images[name].left,
              }}
            />
          )
        })}
      {/* </div> */}
    </div>
  );
};

export default Image;