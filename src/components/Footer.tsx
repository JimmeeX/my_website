import React from 'react';

import Icon from './Icon';

import metadata from '../data/metadata';
import { ReactComponent as Logo } from '../images/logo.svg';
import GithubIcon from '../images/github.svg';
import LinkedInIcon from '../images/linkedin.svg';
import EnvelopeIcon from '../images/envelope.svg';

const Footer = () => (
  <footer id="footer">
    <a id="footer-logo" href={metadata.url} aria-label="James Lin Portfolio">
      <Logo width={50} height={50} />
    </a>
    <div id="icon-bar">
      <Icon
        url="https://github.com/JimmeeX"
        src={GithubIcon}
        ariaLabel="Github"
      />
      <Icon
        url="https://www.linkedin.com/in/jameslin1997/"
        src={LinkedInIcon}
        ariaLabel="Linkedin"
      />
      <Icon
        url="mailto:jameslin199713@gmail.com"
        src={EnvelopeIcon}
        ariaLabel="E-mail"
      />
    </div>
  </footer>
);

export default Footer;
