'use client';

import {useRef, useLayoutEffect} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SvgCirclesKaleidoscope = () => {
  const svgRef = useRef(null);
  const circlesRef = useRef([]);
  const imagesRef = useRef([]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const circles = circlesRef.current;
    const images = imagesRef.current;

    if (!svg || !circles || !images) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: 'top 60%',
          end: 'top 40%'
          // scrub: true
          // markers: true
        }
      });

      tl.fromTo(
        svg,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'none'
        }
      );

      tl.to(
        circles[1],
        {
          attr: {r: 42.42},
          duration: 0.1,
          ease: 'none'
        },
        0
      );

      tl.to(
        circles[2],
        {
          attr: {r: 28.28},
          duration: 0.25,
          ease: 'none'
        },
        0
      );

      tl.to(
        images[1],
        {
          attr: {
            x: -56.56,
            y: -56.56,
            width: 127.26,
            height: 127.26
          },
          transformOrigin: '50% 50%',
          duration: 0.1,
          ease: 'none'
        },
        0
      );

      tl.to(
        images[2],
        {
          attr: {
            x: -56.56,
            y: -56.56,
            width: 127.26,
            height: 127.26
          },
          transformOrigin: '50% 50%',
          duration: 0.1,
          ease: 'none'
        },
        0
      );

      tl.to(
        images[2],
        {
          attr: {
            x: -37.71,
            y: -37.71,
            width: 84.42,
            height: 84.42
          },
          transformOrigin: '50% 50%',
          duration: 0.1,
          ease: 'none'
        },
        0
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="-75 -75 150 150"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id="clip-circle-60">
          <circle
            ref={(el) => circlesRef.current.push(el)}
            cx="0"
            cy="0"
            r="60"
            filter="url(#inner-shadow)"
          />
        </clipPath>

        <clipPath id="clip-circle-42.42">
          <circle
            ref={(el) => circlesRef.current.push(el)}
            cx="0"
            cy="0"
            r="60"
            filter="url(#inner-shadow)"
          />
        </clipPath>

        <clipPath id="clip-circle-28.28">
          <circle
            ref={(el) => circlesRef.current.push(el)}
            cx="0"
            cy="0"
            r="60"
          />
        </clipPath>
      </defs>

      <image
        ref={(el) => imagesRef.current.push(el)}
        href="/images/img_about_perspective_640x640.jpg"
        x="-80"
        y="-80"
        width="180"
        height="180"
        clipPath="url(#clip-circle-60)"
        filter="url(#inner-shadow)"
      />

      <rect
        x="-42.42"
        y="-42.42"
        width="84.84"
        height="84.84"
        transform="rotate(45)"
        fill="#1e1e1e"
      />

      <image
        ref={(el) => imagesRef.current.push(el)}
        href="/images/img_about_perspective_640x640.jpg"
        x="-80"
        y="-80"
        width="180"
        height="180"
        clipPath="url(#clip-circle-42.42)"
        filter="url(#inner-shadow)"
      />

      <rect
        x="-28.28"
        y="-28.28"
        width="56.56"
        height="56.56"
        transform="rotate(45)"
        fill="#1e1e1e"
      />

      <image
        ref={(el) => imagesRef.current.push(el)}
        href="/images/img_about_perspective_640x640.jpg"
        x="-80"
        y="-80"
        width="180"
        height="180"
        clipPath="url(#clip-circle-28.28)"
        filter="url(#inner-shadow)"
      />
      {/* <image
        ref={(el) => imagesRef.current.push(el)}
        href="/images/img_about_perspective_640x640.jpg"
        x="-37.71"
        y="-37.71"
        width="84.42"
        height="84.42"
        clipPath="url(#clip-circle-28.28)"
      /> */}
    </svg>
  );
};

export default SvgCirclesKaleidoscope;
