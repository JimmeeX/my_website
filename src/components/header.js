import React from 'react';

import Button from './button';

import { ReactComponent as Logo } from '../images/logo-bg.svg';

const Header = () => {
  return (
    <div id='header'>
      <div id='header-bar'>
        <a id='header-logo' href='https://jameslin.me/'><Logo width={75} height={75}/></a>
        <Button id='header-button' large text='Contact Me' url='mailto:jameslin199713@gmail.com' />
      </div>
    </div>
  );
};

export default Header;