import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import AOS from 'aos';

import 'aos/dist/aos.css';
import './style/main.css';

AOS.init();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
