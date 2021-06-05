import React from 'react';

import SEO from './components/SEO';
import Title from './pages/Title/Title';
import Intro from './pages/Intro/Intro';
import Projects from './pages/Projects/Projects';
import Journey from './pages/Journey/Journey';
import Learn from './pages/Learn/Learn';
import Footer from './components/Footer';

const App = () => (
  <main className="app">
    <SEO />
    <Title />
    <Intro />
    <Projects />
    <Journey />
    <Learn />
    <Footer />
  </main>
);

export default App;
