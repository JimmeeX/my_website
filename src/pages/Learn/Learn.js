import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSpring, animated as a, config } from 'react-spring';

import Button from '../../components/button';

const fadeOffset = 100;

const Learn = () => {
  const [fade, setFade] = useState(false);
  const ref = useRef();

  const checkFade = useCallback(() => {
    const el = ref.current;
    if (el == null) {
      setFade(false);
      return;
    };

    const bounds = el.getBoundingClientRect();
    const { top } = bounds;
    if (top - window.innerHeight + fadeOffset < 0) setFade(true);
    else setFade(false);
  }, [ref, setFade]);

  useEffect(() => {
    document.addEventListener("scroll", checkFade);
    return () => {
      document.removeEventListener("scroll", checkFade);
    }
  }, [checkFade]);

  const fadeSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(25%)' },
    to: fade ? {
      opacity: 1, transform: 'translateY(0px)'
    } : {
      opacity: 0, transform: 'translateY(25%)'
    },
    config: config.stiff
  });

  return (
    <a.div ref={ref} id='learn' className='page-card' style={fadeSpring}>
      <div id='learn-text'>
        <div id='learn-header' className='header-invert'>Learning & Sharing</div>
        <p id='learn-paragraph' className='paragraph-invert'>I love discovering new apps, software, tech, gadgets and the likes to improve my day-to-day life. Inspired by <a className='text-link' href='https://wiki.nikitavoloboev.xyz/'>Nikita Voloboev</a>, I've recently started to document & share resources, courses, and apps with the community.</p>
        <Button id='learn-button' large text='Check out my Wiki' url='https://jimmeex.gitbook.io/wiki/' />
      </div>
    </a.div>
  );
};

export default Learn;