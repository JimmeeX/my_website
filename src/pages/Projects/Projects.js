import React from 'react';

import Button from '../../components/button';
import Card from '../../components/card';

import projectList from '../../data/projectList';

const Projects = () => {
  return (
    <div id='projects' className='page-box-wrapper'>
      <div id='projects-box' className='page-box'>
        <div id='projects-header' className='header'>My Recent Projects</div>
        <div id='projects-container'>
          {projectList.map((project, key) =>
            <Card key={key} project={project} />
          )}
        </div>
        <Button
          id='projects-button'
          large
          text={'See more on Github'}
          url={'https://github.com/JimmeeX'}
        />
      </div>
    </div>
  );
}

export default Projects;