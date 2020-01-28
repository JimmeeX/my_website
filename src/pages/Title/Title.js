import React from 'react';

import { ReactComponent as Boy } from '../../images/boy.svg';

const Title = () => {
  return (
    <div id='title' className='page-fill'>
        <div id='title-text-wrapper'>
          <div className='title'>Aspiring Full-stack Developer</div>
          <div className='subtitle'>I love designing & developing websites and apps to benefit the community.</div>
        </div>
        <Boy id='title-svg' height={300} />
    </div>
  );
}

export default Title;