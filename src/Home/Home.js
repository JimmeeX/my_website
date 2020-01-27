import React from 'react';

import Text from './text';
import Image from './image';

const paragraphs = [
  {title: 'Hello World!', children: ['']},
  {title: 'My name is', children: ['James Lin']},
  {title: 'I am a', children: ['Web Developer', 'Data Engineer']},
  {title: 'I enjoy', children: ['App Development', 'Teaching']},
  {title: 'Welcome to my Website!', children: ['']},
];

const duration = 5000;

const Home = (props) => {
  const { pageWidth } = props;
  return (
    <div id='home'>
      <div className='home-grid'>
        <Text paragraphs={paragraphs} duration={duration} pageWidth={pageWidth} />
        <Image duration={duration} pageWidth={pageWidth} />
      </div>
    </div>
  );
}

export default Home;