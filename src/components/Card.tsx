import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';

import Button from './Button';

const ratio = 1.5;

type CardProps = {
  project: {
    title: string;
    img: string;
    url: string;
  };
};

const Card = (props: CardProps) => {
  const { project } = props;

  const [flipped, setFlipped] = useState(true); // True for Picture
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const img = require(`../images/projects/${project.img}`);

  return (
    <div
      className="card"
      ref={ref}
      style={{ height: `${bounds.width / ratio}px` }}
      onClick={() => {
        setFlipped((state) => !state);
      }}
      onKeyPress={() => {
        setFlipped((state) => !state);
      }}
      role="button"
      tabIndex={0}
    >
      <a.div
        className="card-thumbnail"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          backgroundImage: `url(${img})`,
        }}
      />
      <a.div
        className="card-caption"
        style={{
          // TODO: FIX
          opacity: 0,
          transform,
        }}
      >
        <div className="card-caption-title">{project.title}</div>
        <Button disabled={flipped} text="Visit Website" url={project.url} />
      </a.div>
    </div>
  );
};

export default Card;
