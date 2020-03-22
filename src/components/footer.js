import React from 'react';

import Icon from './icon';

import metadata from '../data/metadata';
import { ReactComponent as Logo } from '../images/logo.svg';
import GithubIcon from '../images/github.svg';
import LinkedInIcon from '../images/linkedin.svg';
import EnvelopeIcon from '../images/envelope.svg';

const Footer = () => {
  return (
    <div id='footer'>
      <a id='footer-logo' href={metadata.url}><Logo width={50} height={50}/></a>
      <div id='icon-bar'>
        <Icon url='https://github.com/JimmeeX' src={GithubIcon} />
        <Icon url='https://www.linkedin.com/in/jameslin1997/' src={LinkedInIcon} />
        <Icon url='mailto:jameslin199713@gmail.com' src={EnvelopeIcon} />
      </div>
    </div>
  );
};

export default Footer;