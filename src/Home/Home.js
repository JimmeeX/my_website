import React, { useEffect, useState } from 'react';

import { useTransition, animated } from 'react-spring';

import Text from './text';

/**
 * TODO
 * 1. Background Transition Colour
 * 2. Fade Up Enter
 * - Animated Paragraph - Title, ID, iterations
 * - Span - Title, ID, 
 */

const paragraphs = [
  {title: 'Hello World!', children: ['']},
  {title: 'My name is', children: ['James Lin']},
  {title: 'I am a', children: ['Web Developer', 'Data Engineer']},
  {title: 'I enjoy', children: ['App Development', 'Teaching']},
  {title: 'Welcome to my Website!', children: ['']},
];

const duration = 5000;
const transitionConfig = {
  from: { opacity: 0, transform: 'translateY(100px)' },
  enter: { opacity: 1, transform: 'translateY(0px)' },
  leave: { opacity: 0, transform: 'translateY(-40px)' },
  config: { tension: 220, friction: 45 }
}

const Home = (props) => {
  const [items] = useState(paragraphs.map((item, i) => ({ ...item, id: i })));
  const [index, setIndex] = useState(0);

  // Transition Animation

  // Text Animation
  useEffect(() => {
    const interval = setInterval(() => {
      // setIndex(index => (Math.min(index + (1 / items[Math.floor(index)].children.length), items.length - 1)));
      setIndex(index => (index + (1 / items[Math.floor(index)].children.length)) % items.length);

    // }, duration * (Math.min(1, items[index].children.length)));
    }, duration);
    return () => clearInterval(interval);
  }, [items]);

  // Fade In from Below
  const transitions = useTransition(items[Math.floor(index)], item => item.id, transitionConfig);

  return (
    <div id='home'>
      <div className='text-wrapper'>
        {transitions.map(({item, props, key}) =>
          <animated.div
            style={{
              ...props,
              position: 'absolute',
              // display: 'flex'
            }}
            key={key}
          >
            <Text
              {...item}
              transitionConfig={transitionConfig}
              duration={duration}
            />
          </animated.div>
        )}
      </div>
      {/* <div
        id='home-circle'
        className='page-circle'
        style={{
          top: `${headerPos.top}px`,
          left: `${headerPos.left}px`,
          width: `${headerPos.size}px`,
          height: `${headerPos.size}px`
        }}
      /> */}
    </div>
  );
}

export default Home;