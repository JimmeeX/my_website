import React from 'react';

import { ReactComponent as Boy } from '../images/home/boy.svg';
import { ReactComponent as Browser } from '../images/home/monitor-browser-bw.svg';

import { useSpring, animated } from 'react-spring';

const Image = (props) => {
  /**
   * Boy Animation
   */

  const boySpring = useSpring({
    from: { height: '0px' },
    to: { height: '300px' },
    // delay: 1000
  });

  const AnimatedBoy = animated(Boy);
  const AnimatedBrowser = animated(Browser);

  return (
    <div className='image'>
      <AnimatedBrowser style={boySpring} />

      <AnimatedBoy style={boySpring} />
      {/* <AnimatedBrowser style={boySpring} /> */}
    </div>
  );
};

export default Image;