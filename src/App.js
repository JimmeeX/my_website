import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './Home/Home';
import Work from './Work/Work';
import Projects from './Projects/Projects';

// Pass HeaderDetails to other Components to make position calculations
const headerDetails = {
  items: ['home', 'work', 'projects'],
  top: 150,
  size: 100,
  spacing: 'space-around'
};

const calculateHeaderPos = (setHeaderPos, setPageWidth) => {
  const { items, top, size, spacing } = headerDetails;
  const pageWidth = document.body.offsetWidth;
  const numEl = items.length;
  const headerPos = items.reduce((map, item, i) => {
    if (spacing === 'space-around') {
      // 1 unit offset for start & end, and 2 units separating each item
      const numGapUnits = numEl * 2;
      const unit = (pageWidth - (numEl * size)) / numGapUnits;
      const left = unit + i * (2 * unit + size);
      map[item] = { top: top, left: left, size: size };
      return map;
    }
    return null;
  }, {});

  if (!!setHeaderPos)
    setHeaderPos(headerPos);

  if (!!setPageWidth)
    setPageWidth(pageWidth);
  return headerPos
};

const App = () => {
  const pathRegex = /\/(\w+)/;
  const firstPath = pathRegex.exec(window.location.pathname);
  const currPath = firstPath ? firstPath[1] : 'home';

  const active = useState(currPath);

  const [headerPos, setHeaderPos] = useState(calculateHeaderPos());
  const [pageWidth, setPageWidth] = useState(document.body.offsetWidth);

  useEffect(() => {
    window.addEventListener('resize', () => calculateHeaderPos(setHeaderPos, setPageWidth));
    return () => {
      window.removeEventListener('resize', () => calculateHeaderPos(setHeaderPos, setPageWidth));
    }
  }, []);

  return (
    <BrowserRouter>
      <Header active={active} headerDetails={headerDetails} headerPos={headerPos} />
      <Route exact path='/' render={(props) => <Home {...props} pageWidth={pageWidth} />} />
      <Route exact path='/work' render={(props) => <Work {...props} pageWidth={pageWidth} />} />
      <Route exact path='/projects' render={(props) => <Projects {...props} active={active} headerPos={headerPos} />} />
    </BrowserRouter>
  )
};

export default App;
