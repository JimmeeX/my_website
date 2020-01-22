import React, { useState, useEffect } from 'react';

import { useTransition, animated } from 'react-spring';

const duration = 5000;
const transitionConfig = {
  from: { opacity: 0, transform: 'translateY(100px)' },
  enter: { opacity: 1, transform: 'translateY(0px)' },
  leave: { opacity: 0, transform: 'translateY(-40px)' },
  config: { tension: 220, friction: 45 }
}

const Text = (props) => {
  const { paragraphs } = props;
  const [items] = useState(paragraphs.map((item, i) => ({ ...item, id: i })));
  const [index, setIndex] = useState(0);

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
    <div
      className='text'
    >
      {transitions.map(({item, props, key}) =>
        <animated.div
          style={{
            ...props,
            position: 'absolute',
            // display: 'flex'
          }}
          key={key}
        >
          <SubText
            {...item}
          />
        </animated.div>
      )}
    </div>
  );
};

const SubText = (props) => {
  const { title, children } = props;

  const [items] = useState(children.map((item, i) => ({title: item, id: i})));

  const [index, setIndex] = useState(0);

  // Initialise Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index => (Math.min(index + 1, items.length - 1)));
    }, duration);
    return () => clearInterval(interval);
  }, [items.length]);

  const transitions = useTransition(items[index], item => item.id, transitionConfig);

  return (
    <div
      className='text'
    >
      <div className='text-title'>
        {title} &nbsp;
        {transitions.map(({item, props, key}) =>
          <animated.span
            className='text-span'
            style={
              index > 0 ? {
              ...props,
              position: 'absolute'
              } : {
                position: 'absolute'
              }
            }
            key={key}
          >
            {item.title}
          </animated.span>
        )}
      </div>
    </div>
  );
};

export default Text