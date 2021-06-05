import React, { useState } from 'react';

import { useSpring, animated as a } from 'react-spring';

const Button = ({
  url,
  id,
  text,
  large = false,
  disabled = false,
}: {
  url: string;
  text: string;
  id?: string;
  large?: boolean;
  disabled?: boolean;
}) => {
  // const { disabled, url, large, id, text } = props;

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

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (disabled) e.preventDefault();
    else e.stopPropagation();
  };

  return (
    <a
      id={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={large ? 'button-large' : 'button'}
      onMouseEnter={() => setHover(!disabled)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <a.div className="button-text" style={fadeSpring}>
        {text}
      </a.div>
    </a>
  );
};

export default Button;
