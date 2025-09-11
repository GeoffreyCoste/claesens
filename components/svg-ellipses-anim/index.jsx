'use client';

import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import {useMedia} from '@/hooks/useMedia';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const SvgEllipsesAnim = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const group1Ref = useRef(null);
  const group2Ref = useRef(null);
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const path3Ref = useRef(null);
  const path4Ref = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const tl1 = useRef(null);
  const tl2 = useRef(null);

  const {isHydrated, matches} = useMedia();
  const {desktop} = matches;

  useEffect(() => {
    if (!isHydrated) return;

    const container = containerRef.current;
    const svg = svgRef.current;
    const group1 = group1Ref.current;
    const group2 = group2Ref.current;
    const path1 = path1Ref.current;
    const path2 = path2Ref.current;
    const path3 = path3Ref.current;
    const path4 = path4Ref.current;
    const circle1 = circle1Ref.current;
    const circle2 = circle2Ref.current;
    const star1 = star1Ref.current;
    const star2 = star2Ref.current;

    if (
      !container ||
      !svg ||
      !group1 ||
      !group2 ||
      !path1 ||
      !path2 ||
      !path3 ||
      !path4 ||
      !star1 ||
      !star2 ||
      !circle1 ||
      !circle2
    )
      return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: '(max-width: 767px)',
        isTablet: '(min-width: 768px) and (max-width: 1023px)',
        isDesktop: '(min-width: 1024px)'
      },
      (context) => {
        let {isMobile, isTablet, isDesktop} = context.conditions;

        const ctx = gsap.context(() => {
          tl1.current = gsap.timeline({
            paused: true,
            defaults: {duration: 3, ease: 'none'}
          });

          tl2.current = gsap.timeline({
            paused: true,
            defaults: {duration: 3, ease: 'none'},
            onComplete: () => {
              tl2.current.seek(0).invalidate(); // Clean reinitialization
              tl2.current.play(); // Restart animation
            }
          });

          if (isTablet || isDesktop) {
            tl1.current.play();
            tl2.current.play();
          }

          if (isMobile) {
            ScrollTrigger.create({
              trigger: container,
              start: 'top bottom',
              onEnter: () => {
                tl1.current.play();
                tl2.current.play();
              }
              // markers: true
            });
          }

          // Animate tl1
          tl1.current.addLabel('tl1_start');

          tl1.current.to(
            svg,
            {
              opacity: 1,
              scale: 1,
              ease: 'power2.inOut'
            },
            'tl1_start'
          );

          // Animate tl2
          tl2.current.clear(); // Cleans up any previous animation to avoid buildup
          tl2.current.addLabel('tl2_start');

          tl2.current.to(
            circle1,
            {
              motionPath: {
                path: path1,
                align: path1,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'tl2_start'
          );

          tl2.current.to(
            circle2,
            {
              motionPath: {
                path: path2,
                align: path2,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'tl2_start'
          );

          tl2.current.addLabel('first_half', '>');

          tl2.current.to(
            group2,
            {
              rotate: -10,
              transformOrigin: 'center',
              duration: 1.5
            },
            'tl2_start+=2'
          );

          tl2.current.to(
            circle1,
            {
              motionPath: {
                path: path2,
                align: path2,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'first_half'
          );

          tl2.current.to(
            circle2,
            {
              motionPath: {
                path: path1,
                align: path1,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'first_half'
          );

          tl2.current.addLabel('one_round', '>');

          tl2.current.to(
            circle1,
            {
              motionPath: {
                path: path3,
                align: path3,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'one_round'
          );

          tl2.current.to(
            circle2,
            {
              motionPath: {
                path: path4,
                align: path4,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'one_round'
          );

          tl2.current.addLabel('one_and_a_half', '>');

          tl2.current.to(
            group1,
            {
              rotate: -10,
              transformOrigin: 'center',
              duration: 1.5
            },
            'one_round+=1'
          );

          tl2.current.to(
            circle1,
            {
              motionPath: {
                path: path4,
                align: path4,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'one_and_a_half'
          );

          tl2.current.to(
            circle2,
            {
              motionPath: {
                path: path3,
                align: path3,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'one_and_a_half'
          );

          tl2.current.addLabel('two_rounds', '>');

          tl2.current.to(
            group1,
            {
              rotate: 0,
              transformOrigin: 'center',
              duration: 1.5
            },
            'two_rounds+=1'
          );

          tl2.current.to(
            circle1,
            {
              motionPath: {
                path: path3,
                align: path3,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'two_rounds'
          );

          tl2.current.to(
            circle2,
            {
              motionPath: {
                path: path4,
                align: path4,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'two_rounds'
          );

          tl2.current.addLabel('two_and_a_half', '>');

          tl2.current.to(
            circle1,
            {
              motionPath: {
                path: path1,
                align: path1,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'two_and_a_half'
          );

          tl2.current.to(
            circle2,
            {
              motionPath: {
                path: path2,
                align: path2,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'two_and_a_half'
          );

          tl2.current.addLabel('three_rounds', '>');

          tl2.current.to(
            group2,
            {
              rotate: 0,
              transformOrigin: 'center',
              duration: 1.5
            },
            'three_rounds'
          );

          tl2.current.to(
            circle1,
            {
              motionPath: {
                path: path2,
                align: path2,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'three_rounds'
          );

          tl2.current.to(
            circle2,
            {
              motionPath: {
                path: path1,
                align: path1,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
              }
            },
            'three_rounds'
          );
        });

        return () => ctx.revert();
      }
    );
    return () => mm.revert();
  }, [isHydrated]);

  return (
    <div ref={containerRef} className={styles.svg_container}>
      <svg
        ref={svgRef}
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <g ref={group1Ref}>
          <path
            d="M222.55,174.57c2.24-.63,4.49-1.24,6.75-1.85,117.36-31.45,221.77-22.34,233.21,20.33s-71.16,100.46-185.05,132.37"
            fill="none"
            stroke="#1e1e1e"
            strokeWidth={isHydrated && desktop ? 2 : 3}
          />

          <path
            d="M277.45,325.43c-2.24.63-4.49,1.24-6.75,1.85-117.36,31.45-221.77,22.34-233.21-20.33-11.22-41.86,71.16-100.46,185.05-132.37"
            fill="none"
            stroke="#1e1e1e"
            strokeWidth={isHydrated && desktop ? 2 : 3}
          />
        </g>

        <g ref={group2Ref}>
          <path
            d="M222.55,174.57c2.24-.63,4.49-1.24,6.75-1.85,117.36-31.45,221.77-22.34,233.21,20.33s-71.16,100.46-185.05,132.37"
            fill="none"
            stroke="#1e1e1e"
            strokeWidth={isHydrated && desktop ? 2 : 3}
          />

          <path
            d="M277.45,325.43c-2.24.63-4.49,1.24-6.75,1.85-117.36,31.45-221.77,22.34-233.21-20.33-11.22-41.86,71.16-100.46,185.05-132.37"
            fill="none"
            stroke="#1e1e1e"
            strokeWidth={isHydrated && desktop ? 2 : 3}
          />
        </g>

        {/* None visible paths only used for motion */}
        <path
          ref={path1Ref}
          d="M222.55,174.57c2.24-.63,4.49-1.24,6.75-1.85,117.36-31.45,221.77-22.34,233.21,20.33s-71.16,100.46-185.05,132.37"
          fill="none"
          stroke="none"
          strokeWidth={isHydrated && desktop ? 2 : 3}
        />
        <path
          ref={path2Ref}
          d="M277.45,325.43c-2.24.63-4.49,1.24-6.75,1.85-117.36,31.45-221.77,22.34-233.21-20.33-11.22-41.86,71.16-100.46,185.05-132.37"
          fill="none"
          stroke="none"
          strokeWidth={isHydrated && desktop ? 2 : 3}
        />
        <path
          ref={path3Ref}
          d="M222.55,174.57c107.75-48.76,208.53-56.82,226.84-17.55,18.67,40.04-55.46,114.13-165.58,165.48-2.12.99-4.24,1.96-6.36,2.92"
          fill="none"
          stroke="none"
          strokeWidth={isHydrated && desktop ? 2 : 3}
        />
        <path
          ref={path4Ref}
          d="M277.45,325.43c-107.75,48.76-208.53,56.82-226.84,17.55s55.46-114.13,165.58-165.48c2.12-.99,4.24-1.96,6.36-2.92"
          fill="none"
          stroke="none"
          strokeWidth={isHydrated && desktop ? 2 : 3}
        />

        <circle
          ref={circle1Ref}
          r="10"
          fill="#fce300"
          stroke="#1e1e1e"
          strokeWidth={isHydrated && desktop ? 2 : 3}
        />

        <circle
          ref={circle2Ref}
          r="10"
          fill="#fce300"
          stroke="#1e1e1e"
          strokeWidth={isHydrated && desktop ? 2 : 3}
        />

        {/* Stars shapes */}
        <g
          ref={star1Ref}
          className={styles.star}
          clipPath="url(#clip0_118_208)" /* transform="translate(350, 30)" */ /* scale(0.35) */
        >
          <path
            d="M100 200C97.1048 105.262 94.738 102.91 0 100C94.738 97.1048 97.0903 94.738 100 0C102.895 94.738 105.262 97.0903 200 100C105.262 102.91 102.91 105.233 100 200Z"
            fill="black"
          />
        </g>
        <g
          ref={star2Ref}
          className={styles.star}
          clipPath="url(#clip0_118_208)" /* transform="translate(70, 400)" */ /* scale(0.35) */
        >
          <path
            d="M100 200C97.1048 105.262 94.738 102.91 0 100C94.738 97.1048 97.0903 94.738 100 0C102.895 94.738 105.262 97.0903 200 100C105.262 102.91 102.91 105.233 100 200Z"
            fill="black"
          />
        </g>

        <clipPath id="clip0_118_208">
          <rect width="200" height="200" fill="black" />
        </clipPath>
      </svg>
    </div>
  );
};

export default SvgEllipsesAnim;