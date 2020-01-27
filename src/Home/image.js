import React from 'react';

import { useSprings, animated } from 'react-spring';
import SVG from 'react-inlinesvg';

/**
 * TODO: ANIMATED TRAIL POP IN FOR ALL SVGS (TRY SCALE; HEIGHT)
 * TODO: ANIMATE POP IN WITH DURATION
*/

const Image = (props) => {
  const { pageWidth } = props;

  // Generate Image Parameters based on PageWidth
  let images;
  if (pageWidth <= 700) {
    images = {
      boy: { height: 200, top: 0, left: 100, delay: 0 },
      browser: { height: 100, top: 100, left: 200, delay: 0 },
      cloud: { height: 50, top: 0, left: 0, delay: 0 },
      cog: { height: 30, top: 15, left: 48, delay: 0 },
      database: { height: 100, top: 100, left: 0, delay: 0 }
    };
  }
  else {
    images = {
      boy: { height: 300, top: 0, left: 150, delay: 0 },
      browser: { height: 200, top: 100, left: 300, delay: 0 },
      cloud: { height: 75, top: 65, left: 0, delay: 0 },
      cog: { height: 45, top: 90, left: 70, delay: 0 },
      database: { height: 150, top: 150, left: 0, delay: 0 }
    };
  }

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

  const imageNames = Object.keys(images);

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