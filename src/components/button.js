import React, { useState } from 'react';

import { useSpring, animated as a } from 'react-spring';

const Button = (props) => {
  const { disabled, url } = props;

  const [hover, setHover] = useState(false);

  const fadeSpring = useSpring({
    from: { backgroundColor: `rgba(255, 255, 255, 1)`, color: `black` },
    to: {
      backgroundColor: hover ? `rgba(255, 255, 255, 0)` : `rgba(255, 255, 255, 1)`,
      color: hover ? `white` : `black`
    }
  });

  return (
    <a
      href={disabled ? null : url}
      className='button'
      onMouseEnter={() => setHover(!disabled ? true : false)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <a.div className='button-text' style={fadeSpring}>{props.text}</a.div>
    </a>
  );
}

export default Button;