import React, { Fragment, useState, useEffect } from 'react';

import { useTransition, animated } from 'react-spring';

const Text = (props) => {
  const { title, children, transitionConfig, duration } = props;

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

  console.log(transitions)
  // TODO: Try relative position, but let the item finish leaving?
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
      {/* {transitions.map(({item, props, key}) =>
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
      )} */}
    </div>
  );
};

export default Text