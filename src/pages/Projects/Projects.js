import React from 'react';

import Card from '../../components/card';

import projectList from '../../data/projectList';

const Projects = () => {
  return (
    <div id='projects' className='page-box'>
        <div id='projects-header' className='header'>My Recent Projects</div>
        <div id='projects-container'>
          {projectList.map((project, key) =>
            <Card key={key} project={project} />
          )}
        </div>
    </div>
  );
}

export default Projects;