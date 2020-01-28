import React from 'react';

import Title from './pages/Title/Title';
import Intro from './pages/Intro/Intro';
import Projects from './pages/Projects/Projects';
import Journey from './pages/Journey/Journey';
import Learn from './pages/Learn/Learn';
import Footer from './components/footer';


const App = () => {
  return (
    <div className='app'>
      <Title />
      <Intro />
      <Projects />
      <Journey />
      <Learn />
      <Footer />
    </div>
  );
};

export default App;
