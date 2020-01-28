import React from 'react';

import Button from '../../components/button';

const Learn = () => {
  return (
    <div id='learn' className='page-card'>
      <div id='learn-text'>
        <div id='learn-header' className='header-invert'>Learning & Sharing</div>
        <p id='learn-paragraph' className='paragraph-invert'>I love learning and sharing resources. You can check out what I know here. Learn and grow together as a community. Inspired by Nikita Voloboev</p>
        <Button text={'Checkout my Wiki'} />
      </div>
    </div>
  );
}

export default Learn;