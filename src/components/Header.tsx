import React from 'react';

import Button from './Button';

import metadata from '../data/metadata';
import { ReactComponent as Logo } from '../images/logo-bg.svg';

const Header = () => (
  <header id="header">
    <div id="header-bar">
      <a id="header-logo" href={metadata.url} aria-label="James Lin Portfolio">
        <Logo width={75} height={75} />
      </a>
      <Button
        id="header-button"
        large
        text="Contact Me"
        url="mailto:jameslin199713@gmail.com"
      />
    </div>
  </header>
);

export default Header;
