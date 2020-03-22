import React, { useState } from 'react';

import { useSpring, animated as a } from 'react-spring';

const Button = (props) => {
  const { disabled, url, large, id } = props;

  const [hover, setHover] = useState(false);

  const fadeSpring = useSpring({
    from: { backgroundColor: `rgba(255, 255, 255, 1)`, color: `black` },
    to: {
      backgroundColor: hover ? `rgba(255, 255, 255, 0)` : `rgba(255, 255, 255, 1)`,
      color: hover ? `white` : `black`
    }
  });

  const handleClick = (e) => {
    if (disabled) e.preventDefault();
    else e.stopPropagation();
  };

  return (
    <a
      id={id}
      href={url}
      className={large ? 'button-large' : 'button'}
      onMouseEnter={() => setHover(!disabled ? true : false)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <a.div className='button-text' style={fadeSpring}>{props.text}</a.div>
    </a>
  );
}

export default Button;