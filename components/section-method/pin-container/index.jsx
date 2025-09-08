'use client';

import styles from './style.module.scss';
import {useLayoutEffect, useRef} from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useLenis} from '@/hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

const PinContainer = () => {
  const containerRef = useRef(null);
  const svgContainerRef = useRef(null);
  const svgRef = useRef(null);
  const circlesRef = useRef([]);
  const blackCircleRef = useRef(null);

  const {lenis} = useLenis();

  const {desktop} = useMediaQueries();

  const videoSource = desktop
    ? '/videos/method_video_1920x1080.mp4'
    : '/videos/method_video_1280x720.mp4';
  const videoThumbnail = desktop
    ? '/videos/method_thumbnail_1920x1080.jpg'
    : '/videos/method_thumbnail_1280x720.jpg';

  /* useLayoutEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (!container || !svg) return;

    const mm = gsap.matchMedia();

    // Apply animation only when window size is between 768 and 1023px
    mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
      gsap.fromTo(
        svg,
        {height: '50%'},
        {
          height: '100%',
          duration: 1,
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            toggleActions: 'play none play reverse'
          }
        }
      );
    });

    return () => {
      mm.revert(); // Cleanup when component unmounts
    };
  }, [svgRef, containerRef]); */

  useLayoutEffect(() => {
    const container = containerRef.current;
    const svgContainer = svgContainerRef.current;
    const circles = circlesRef.current;
    const blackCircle = blackCircleRef.current;

    if (!container || !svgContainer || !circles || !blackCircle) return;
    if (!lenis) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        xs: '(max-width: 359px)',
        sm: '(min-width: 360px) and (max-width: 767px)',
        md: '(min-width: 768px) and (max-width: 1023px)',
        lg: '(min-width: 1024px) and (max-width: 1199px)',
        xl: '(min-width: 1200px) and (max-width: 1439px)',
        xxl: '(min-width: 1440px)'
      },
      (context) => {
        const {xs, sm, md, lg, xl, xxl} = context.conditions;

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: xs ? 'top top' : sm ? 'center center' : 'center center',
              // end: 'bottom top',
              end: xs ? 'bottom center' : sm ? '+=65%' : '+=65%',
              scrub: true,
              pin: svgContainer,
              pinSpacing: xs ? true : false
              // markers: true
            }
          });

          // Animate circles overlay
          tl.to(circles, {
            cx: 300,
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              // end: xs ? '+=50%' : '+=25%',
              // end: '+=25%',
              end: '+=15%',
              scrub: true
              // markers: true
            }
          });

          // Animate black circle appearance
          tl.fromTo(
            blackCircle,
            {
              scale: 0,
              opacity: 0.8,
              transformOrigin: 'center'
            },
            {
              scale: 10,
              opacity: 1,
              scrollTrigger: {
                trigger: container,
                // start: '+=8%',
                // start: '+=15%',
                start: xs
                  ? 'top+=10% top'
                  : sm
                    ? 'top+=75% top'
                    : 'top+=40% top',
                end: xs ? '+=15%' : '+=15%',
                // end: xs ? '+=20%' : '+=10%',
                scrub: true
                // markers: true
              }
            }
          );

          // Animate circles opacity
          /* tl.to(circles, {
            opacity: 0,
            scrollTrigger: {
              trigger: container,
              start: '+=10%',
              end: '+=25%',
              scrub: true
            }
          }); */

          ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            onEnter: () => (lenis.options.duration = 2.5),
            onLeave: () => (lenis.options.duration = 1.2),
            onEnterBack: () => (lenis.options.duration = 2.5),
            onLeaveBack: () => (lenis.options.duration = 1.2)
          });
        });

        return () => {
          ctx.revert(); // Cleanup animations and ScrollTrigger effects when component unmounts
        };
      }
    );

    return () => {
      mm.revert();
      lenis.options.duration = 1.2; // Default value
    };
  }, [lenis]);

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
              playsInline
              preload="metadata" // Avoid to download the entire video right away
              poster={videoThumbnail}
              style={{display: 'block', filter: 'url(#grayscale)'}}
            >
              {/* A INTEGRER */}
              {/* <source src={videoSource.replace('.mp4', '.webm')} type="video/webm" /> */}
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
        </svg>
      </div>
    </div>
  );
};

export default PinContainer;