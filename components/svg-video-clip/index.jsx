'use client';

import styles from './style.module.scss';
import {useRef, useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

const SVGVideoClip = ({videoSource}) => {
  const circleRefs = useRef([]);
  const svgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        // start: 'top 25%',
        //start: 'center center',
        // end: 'bottom center',
        start: 'top center',
        end: '+=500',
        scrub: true,
        pin: true
        // pinSpacing: false,
        // markers: true
      }
    });

    tl.to(circleRefs.current, {
      cx: 300
      // y: 0,
      // opacity: 0,
      // scale: 0.2,
      // duration: 1
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className={styles.svg_video_clip}
      viewBox="0 0 600 400"
      width="100%"
      height="auto"
    >
      <defs>
        <clipPath id="clip1">
          <rect x="0" y="0" width="45" height="400" />
        </clipPath>
        <clipPath id="clip2">
          <rect x="0" y="0" width="100" height="400" />
        </clipPath>
        <clipPath id="clip3">
          <rect x="50" y="0" width="155" height="400" />
        </clipPath>
        <clipPath id="clip4">
          <rect x="100" y="0" width="230" height="400" />
        </clipPath>
        <clipPath id="clip5">
          <rect x="300" y="0" width="380" height="400" />
        </clipPath>
        <clipPath id="combinedClip">
          <circle
            ref={(el) => circleRefs.current.push(el)}
            cx="170"
            cy="200"
            r="150"
            clipPath="url(#clip1)"
          />
          <circle
            ref={(el) => circleRefs.current.push(el)}
            cx="200"
            cy="200"
            r="150"
            clipPath="url(#clip2)"
          />
          <circle
            ref={(el) => circleRefs.current.push(el)}
            cx="255"
            cy="200"
            r="150"
            clipPath="url(#clip3)"
          />
          <circle
            ref={(el) => circleRefs.current.push(el)}
            cx="330"
            cy="200"
            r="150"
            clipPath="url(#clip4)"
          />
          <circle
            ref={(el) => circleRefs.current.push(el)}
            cx="430"
            cy="200"
            r="150"
            clipPath="url(#clip5)"
          />
        </clipPath>

        <filter id="grayscale">
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0 0 0 1 0"
          />
        </filter>
      </defs>

      <foreignObject
        x="0"
        y="0"
        width="600"
        height="400"
        clipPath="url(#combinedClip)"
      >
        <video
          width="600"
          height="400"
          autoPlay
          loop
          muted
          style={{display: 'block', filter: 'url(#grayscale)'}}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </foreignObject>

      {/* Optional: Circles for visual feedback */}
      {/* <circle cx="190" cy="200" r="150" fill="blue" clipPath="url(#clip1)" />
      <circle cx="220" cy="200" r="150" fill="red" clipPath="url(#clip2)" />
      <circle cx="275" cy="200" r="150" fill="yellow" clipPath="url(#clip3)" />
      <circle cx="350" cy="200" r="150" fill="green" clipPath="url(#clip4)" />
      <circle cx="450" cy="200" r="150" fill="orange" clipPath="url(#clip5)" /> */}
    </svg>
  );
};

export default SVGVideoClip;
