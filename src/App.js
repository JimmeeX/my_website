import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './Home/Home';
import Work from './Work/Work';
import Projects from './Projects/Projects';

const App = () => (
  <BrowserRouter>
    <Header />
    <Route exact path='/' component={Home} />
    <Route exact path='/work' component={Work} />
    <Route exact path='/projects' component={Projects} />
  </BrowserRouter>
);

export default App;
