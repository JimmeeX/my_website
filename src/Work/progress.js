import React from 'react';

import { useSpring, animated } from 'react-spring';

const Progress = ({ progress }) => {
  const progressSpring = useSpring({ from: { percent: 0 }, to: { percent: progress } });

  return <animated.div className='progress' style={progressSpring} />
};

export default Progress;