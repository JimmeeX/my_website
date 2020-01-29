import React from 'react';

import Icon from '../components/icon';

import GithubIcon from '../images/github.svg';
import LinkedInIcon from '../images/linkedin.svg';
import EnvelopeIcon from '../images/envelope.svg';

const Footer = () => {
  return (
    <div id='footer'>
      <div id='footer-header' className='header-invert'>Want to see more?</div>
      <div id='icon-bar'>
        <Icon url='https://github.com/JimmeeX' src={GithubIcon} />
        <Icon url='https://www.linkedin.com/in/jameslin1997/' src={LinkedInIcon} />
        <Icon url='mailto:jameslin199713@gmail.com' src={EnvelopeIcon} />
      </div>
    </div>
  );
};

export default Footer;