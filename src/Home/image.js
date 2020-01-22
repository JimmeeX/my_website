import React from 'react';

import { ReactComponent as Boy } from '../images/home/boy.svg';
import { ReactComponent as Browser } from '../images/home/monitor-browser-bw.svg';
// import { ReactComponent as DataCloud } from '../images/home/data-cloud.svg';

import { ReactComponent as Cloud } from '../images/home/cloud.svg';
import { ReactComponent as Cog } from '../images/home/cog.svg';
import { ReactComponent as Database } from '../images/home/database.svg';
import { ReactComponent as LineChart } from '../images/home/line-chart.svg';
import { ReactComponent as PieChart } from '../images/home/pie-chart.svg';


import { useSpring, animated } from 'react-spring';

/**
 * TODO: ANIMATED TRAIL POP IN FOR ALL SVGS (TRY SCALE; HEIGHT)
 * TODO: SPIN COG
 * TODO: ANIMATE PIE CHART SEGMENT
 * TODO: ANIMATE POP IN WITH DURATION
*/

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
    config: { tension: 300, friction: 20 }
  });

  const browserSpring = useSpring({
    from: { height: '0px' },
    to: { height: '200px' },
    // delay: duration * 2
  });

  const dataCloudSpring = useSpring({
    from: { height: '0px' },
    to: { height: '100px' }
  });

  const cogSpring = useSpring({
    from: { height: '0px' },
    to: { height: '50px' }
  });

  const AnimatedBoy = animated(Boy);
  const AnimatedBrowser = animated(Browser);
  // const AnimatedDataCloud = animated(DataCloud);

  const AnimatedCloud = animated(Cloud);
  const AnimatedCog = animated(Cog);
  const AnimatedDatabase = animated(Database);
  const AnimatedLineChart = animated(LineChart);
  const AnimatedPieChart = animated(PieChart);

  return (
    <div className='image'>
      <AnimatedBrowser style={browserSpring} />
      {/* <AnimatedDataCloud style={dataCloudSpring} /> */}
      <AnimatedCloud style={dataCloudSpring} />
      <AnimatedCog style={cogSpring} />
      <AnimatedDatabase style={dataCloudSpring} />
      <AnimatedLineChart style={dataCloudSpring} />
      <AnimatedPieChart style={dataCloudSpring} />


      <AnimatedBoy style={boySpring} />
      {/* <AnimatedBrowser style={boySpring} /> */}
    </div>
  );
};

export default Image;