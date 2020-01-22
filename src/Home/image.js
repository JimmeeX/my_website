import React from 'react';

import { ReactComponent as Boy } from '../images/home/boy.svg';
import { ReactComponent as Browser } from '../images/home/monitor-browser-bw.svg';
import { ReactComponent as DataCloud } from '../images/home/data-cloud.svg';

import { useSpring, animated } from 'react-spring';

const Image = (props) => {
  const { duration } = props;

  /**
   * Boy Animation
   */

  const boySpring = useSpring({
    from: {
      height: '0px'
    },
    to: {
      height: '300px',
      // transform: 
    },
    // delay: 1000
  });

  const browserSpring = useSpring({
    from: { height: '0px' },
    to: { height: '200px' },
    // delay: duration * 2
  });

  const dataCloudSpring = useSpring({
    from: { height: '0px' },
    to: { height: '200px' }
  });

  const AnimatedBoy = animated(Boy);
  const AnimatedBrowser = animated(Browser);
  const AnimatedDataCloud = animated(DataCloud);

  return (
    <div className='image'>
      <AnimatedBrowser style={browserSpring} />
      <AnimatedDataCloud style={dataCloudSpring} />

      <AnimatedBoy style={boySpring} />
      {/* <AnimatedBrowser style={boySpring} /> */}
    </div>
  );
};

export default Image;