import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';
import useMeasure from 'react-use-measure';

const ratio = 1.5; // Width : Height Ratio

const Card = (props) => {
  const { project } = props;

  const [flipped, set] = useState(false);
  const [ref, bounds] = useMeasure();

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  const img = require(`../images/projects/${project.img}`);

  return (
    <div
      className='card'
      ref={ref}
      style={{ height: `${bounds.width / ratio}px` }}
      onClick={() => set(state => !state)}
    >
      <a.div
        className='card-thumbnail'
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          backgroundImage: `url(${img})`
        }}
      />
      <a.div
        className='card-caption'
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      >
        {project.title}
      </a.div>
    </div>
  );
}

export default Card;