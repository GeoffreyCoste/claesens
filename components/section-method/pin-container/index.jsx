import styles from './style.module.scss';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PinContainer = () => {
  const containerRef = useRef(null);
  const svgContainerRef = useRef(null);
  const svgRef = useRef(null);
  const circlesRef = useRef([]);
  const blackCircleRef = useRef(null);

  const videoSource = '/videos/5384976-uhd_4096_2160_30fps.mp4';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: svgContainerRef.current,
          pinSpacing: false,
          markers: true
        }
      });

      // Animate circles overlay
      tl.to(circlesRef.current, {
        cx: 300,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=50%',
          scrub: true,
          markers: true
        }
      });

      // Animate black circle appearance
      tl.fromTo(
        blackCircleRef.current,
        {
          scale: 0,
          opacity: 0.8,
          transformOrigin: 'center'
        },
        {
          scale: 10,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: '+=8%',
            end: '+=60%',
            scrub: true
          }
        }
      );

      // Animate circles opacity
      tl.to(circlesRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: '+=10%',
          end: '+=25%',
          scrub: true
        }
      });
    });

    return () => {
      ctx.revert(); // Cleanup animations and ScrollTrigger effects when component unmounts
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.pin_container}>
      <div ref={svgContainerRef} className={styles.svg_container}>
        <svg
          ref={svgRef}
          className={styles.svg_video_clip}
          viewBox="0 0 600 400"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
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
                ref={(el) => circlesRef.current.push(el)}
                cx="170"
                cy="200"
                r="150"
                clipPath="url(#clip1)"
              />
              <circle
                ref={(el) => circlesRef.current.push(el)}
                cx="200"
                cy="200"
                r="150"
                clipPath="url(#clip2)"
              />
              <circle
                ref={(el) => circlesRef.current.push(el)}
                cx="255"
                cy="200"
                r="150"
                clipPath="url(#clip3)"
              />
              <circle
                ref={(el) => circlesRef.current.push(el)}
                cx="330"
                cy="200"
                r="150"
                clipPath="url(#clip4)"
              />
              <circle
                ref={(el) => circlesRef.current.push(el)}
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

          <circle
            ref={blackCircleRef}
            cx="300"
            cy="200"
            r="150"
            fill="#1e1e1e"
            style={{opacity: 0}}
          />

          {/* Optional: Circles for visual feedback */}
          {/* <circle cx="190" cy="200" r="150" fill="blue" clipPath="url(#clip1)" />
        <circle cx="220" cy="200" r="150" fill="red" clipPath="url(#clip2)" />
        <circle cx="275" cy="200" r="150" fill="yellow" clipPath="url(#clip3)" />
        <circle cx="350" cy="200" r="150" fill="green" clipPath="url(#clip4)" />
        <circle cx="450" cy="200" r="150" fill="orange" clipPath="url(#clip5)" /> */}
        </svg>
      </div>
    </div>
  );
};

export default PinContainer;
