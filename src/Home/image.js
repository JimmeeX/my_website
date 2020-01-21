import React from 'react';

import boy from '../images/home/boy.svg';

const Image = (props) => {
  return (
    <div className='image'>
      <img src={boy} className='home-img' height='300px' />
    </div>
  );
};

export default Image;