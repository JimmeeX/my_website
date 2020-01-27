import React, { useState, useEffect, Fragment } from 'react';

import { useTransition, animated } from 'react-spring';

const transitionConfig = {
  from: { opacity: 0, transform: 'translateY(100px)' },
  enter: { opacity: 1, transform: 'translateY(0px)' },
  leave: { opacity: 0, transform: 'translateY(-40px)' },
  config: { tension: 220, friction: 45 }
}

const Text = (props) => {
  const { paragraphs, duration, pageWidth } = props;
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
  }, [items, duration]);

  // Fade In from Below
  const transitions = useTransition(items[Math.floor(index)], item => item.id, transitionConfig);

  return (
    <div className='text'>
      {transitions.map(({item, props, key}) =>
        <animated.div
          style={{
            ...props,
            position: 'absolute',
          }}
          key={key}
        >
          <SubText
            {...item}
            duration={duration}
            pageWidth={pageWidth}
          />
        </animated.div>
      )}
    </div>
  );
};

const SubText = (props) => {
  const { title, children, duration, pageWidth } = props;

  const [items] = useState(children.map((item, i) => ({title: item, id: i})));

  const [index, setIndex] = useState(0);

  // Initialise Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index => (Math.min(index + 1, items.length - 1)));
    }, duration);
    return () => clearInterval(interval);
  }, [items.length, duration]);

  const transitions = useTransition(items[index], item => item.id, transitionConfig);

  // Responsive Design based on PageWidth
  const renderComponent = (pageWidth) => {
    if (pageWidth <= 700) {
      return (
        <Fragment>
          <div className='text-title'>
            {title}
          </div>
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
        </Fragment>
      );
    }
    else {
      return (
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
      );
    }
  }

  return (
    <div className='subtext'>
      {renderComponent(pageWidth)}
    </div>
  );
};

export default Text