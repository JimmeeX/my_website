import React from 'react';

import Header from '../../components/Header';

import { ReactComponent as Boy } from '../../images/boy.svg';

const Title = () => (
  <section id="title" className="page-fill">
    <Header />
    <div id="title-text-wrapper">
      <div className="title">Aspiring Full-stack Developer</div>
      <div className="subtitle">
        I love designing & developing websites and apps to benefit the
        community.
      </div>
    </div>
    <Boy id="title-svg" />
  </section>
);

export default Title;
