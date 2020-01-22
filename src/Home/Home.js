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

const Home = (props) => {
  return (
    <div id='home'>
      <Text paragraphs={paragraphs} />
      <Image />
    </div>
  );
}

export default Home;