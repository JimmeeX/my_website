import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSpring, animated as a, config } from 'react-spring';

import Button from '../../components/Button';
import Card from '../../components/Card';

import projectList from '../../data/projectList';

const fadeOffset = 100;

const Projects = () => {
  const [fade, setFade] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const checkFade = useCallback(() => {
    const el = ref.current;
    if (el == null) {
      setFade(false);
      return;
    }

    const bounds = el.getBoundingClientRect();
    const { top } = bounds;
    if (top - window.innerHeight + fadeOffset < 0) setFade(true);
    else setFade(false);
  }, [ref, setFade]);

  useEffect(() => {
    document.addEventListener('scroll', checkFade);
    return () => {
      document.removeEventListener('scroll', checkFade);
    };
  }, [checkFade]);

  const fadeSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(25%)' },
    to: fade
      ? {
          opacity: 1,
          transform: 'translateY(0px)',
        }
      : {
          opacity: 0,
          transform: 'translateY(25%)',
        },
    config: config.stiff,
  });

  return (
    <a.section
      ref={ref}
      id="projects"
      className="page-box-wrapper"
      style={fadeSpring}
    >
      <div id="projects-box" className="page-box">
        <div id="projects-header" className="header">
          My Recent Projects
        </div>
        <div id="projects-container">
          {projectList.map((project, key) => (
            <Card key={key} project={project} />
          ))}
        </div>
        <Button
          id="projects-button"
          large
          text="See more on Github"
          url="https://github.com/JimmeeX"
        />
      </div>
    </a.section>
  );
};

export default Projects;
