import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';
import SVG from 'react-inlinesvg';

const Icon = (props) => {
  const { url, src } = props;

  const [hover, setHover] = useState(false);

  const fadeSpring = useSpring({
    from: { backgroundColor: `rgba(255, 255, 255, 1)`, color: `black` },
    to: {
      backgroundColor: hover
        ? `rgba(255, 255, 255, 0)`
        : `rgba(255, 255, 255, 1)`,
      color: hover ? `white` : `black`,
    },
  });

  const fadeSVGSpring = useSpring({
    from: { fill: `black` },
    to: {
      fill: hover ? `white` : `black`,
    },
  });

  const AnimatedSVG = a(SVG);

  return (
    <a
      href={url}
      className="icon"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <a.div className="icon-padding" style={fadeSpring}>
        <AnimatedSVG className="icon-svg" src={src} style={fadeSVGSpring} />
      </a.div>
    </a>
  );
};

export default Icon;
