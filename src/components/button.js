import React from 'react';

const Button = (props) => {
  const { disabled, url } = props;
  return (
    <a href={disabled ? null : url} className='button'>
      <div className='button-text'>{props.text}</div>
    </a>
  );
}

export default Button;