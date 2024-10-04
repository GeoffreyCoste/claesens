'use client';

import styles from './style.module.scss';
import {useLayoutEffect, useRef, useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PinContainer = () => {
  const containerRef = useRef(null);
  const svgContainerRef = useRef(null);
  const svgRef = useRef(null);
  const circlesRef = useRef([]);
  const blackCircleRef = useRef(null);
  const pathRef = useRef(null);
  const asteriskRef = useRef(null);
  const tagsRef = useRef([]);

  const videoSource = '/videos/5384976-uhd_4096_2160_30fps.mp4';

  const tags = ['immersion', 'exploration', 'itération', 'réalisation'];

  useLayoutEffect(() => {
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
  }, [svgRef, containerRef]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const svgContainer = svgContainerRef.current;
    const circles = circlesRef.current;
    const blackCircle = blackCircleRef.current;

    if (!container || !svgContainer || !circles || !blackCircle) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: svgContainer,
          pinSpacing: false,
          markers: true
        }
      });

      // Animate circles overlay
      tl.to(circles, {
        cx: 300,
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=50%',
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
            start: '+=8%',
            end: '+=60%',
            scrub: true
          }
        }
      );

      // Animate circles opacity
      tl.to(circles, {
        opacity: 0,
        scrollTrigger: {
          trigger: container,
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

  useLayoutEffect(() => {
    const path = pathRef.current;

    if (!path) return;

    const pathLength = path.getTotalLength();

    const ctx = gsap.context(() => {
      // Init path properties for animation
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      const startValue =
        window.innerWidth >= 768 && window.innerWidth <= 1023
          ? 'top 75%' // Value for tablets
          : 'top 50%'; // Value for other screens

      // Create path animation with GSAP and ScrollTrigger
      gsap.to(path, {
        strokeDashoffset: 0, // Animate from total length to 0
        duration: 3, // Animation duration
        scrollTrigger: {
          trigger: path, // Element triggering animation
          start: startValue, // Triggers at the specified window height percentage
          end: 'top top', // Triggers end at top
          toggleActions: 'play none none none' // Plays at the entrance, does nothing at other times
        }
      });
    }, pathRef);

    // Cleanup when component unmounts
    return () => {
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const asterisk = asteriskRef.current;

    if (!asterisk) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1, // Repeat indefinitely
        repeatDelay: 1 // Delay between each repetition (1s)
      });

      // Resets rotation to 0 before starting
      tl.set(asterisk, {rotation: 0});

      // Initial rotation with deceleration
      tl.to(asterisk, {
        rotation: 360,
        duration: 1.5, // Duration of rotation animation
        ease: 'power4.out' // Starts fast and slows down
      });

      // Pause before next animation
      tl.to(
        asterisk,
        {
          rotation: 720, // Perform a second 360 degree rotation (cumulative with the first)
          duration: 1.5, // Duration of the rotation animation
          ease: 'power4.out', // Same easing
          delay: 0.2 // Small break between the two rotations
        },
        '+=0.2' // Ensure delay after the first rotation
      );

      // Magnification with rebound
      tl.to(asterisk, {
        scale: 1.5, // Enlarge up to 1.5 times its original size
        duration: 0.8, // Magnification duration
        ease: 'bounce.out' // Rebound effect
      });

      // Shrink to original size
      tl.to(asterisk, {
        scale: 1, // Return to initial size
        duration: 0.6, // Shrking duration
        ease: 'power2.inOut' // Soft easing
      });
    });

    return () => {
      ctx.revert(); // Cleanup when component unmounts
    };
  }, []);

  useLayoutEffect(() => {
    const path = pathRef.current;
    const tags = tagsRef.current;

    if (!path || !tags) return;

    const ctx = gsap.context(() => {
      const startValue =
        window.innerWidth >= 768 && window.innerWidth <= 1023
          ? 'top 75%' // Value for tablets
          : 'top 50%'; // Value for other screens

      gsap.fromTo(
        tags,
        {
          opacity: 0,
          y: 20
          // filter: 'blur(5px)'
        },
        {
          opacity: 1,
          y: 0,
          // filter: 'blur(0px)',
          duration: 1,
          stagger: 0.3, // Shifts the animation of each element by 0.3s
          ease: 'back.in',
          scrollTrigger: {
            trigger: path,
            start: startValue, // Triggers the animation when the container reaches view specified percentage
            end: 'top top' // Ends when the bottom of the container touches the top of the view
          }
        }
      );
    }, tagsRef);

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
        </svg>
      </div>
      <section className={styles.section_interlude}>
        <h2>
          L&apos;essence du design : <br />
          une boucle continue.
        </h2>
        <p>
          Chaque étape s&apos;enchaîne harmonieusement, <br />
          comme un cercle de créativité en perpétuel mouvement.
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 550 550"
          className={styles.svg_arrow}
        >
          <path
            ref={pathRef}
            d="M3.2437365,116.3483878c6.3161534-26.6213652,21.4932253-50.4935918,41.5260572-68.9461231C66.3061268,27.5648367,93.448367,14.7842074,121.9397136,8.6114586c15.1223383-3.2763069,30.6305712-4.686468,46.0961262-4.4331991,15.1056029.2473742,31.3879367,1.607368,44.2471061,10.3355911,10.6142092,7.2044456,18.3471781,19.8517656,14.6989566,32.9117887-3.2032448,11.4670809-14.8478524,19.7202493-26.3551478,13.691173-4.7853053-2.5071895-8.8125722-7.1221985-8.9506141-12.7421687-.1497748-6.0976432,3.779888-11.1396365,8.4206738-14.6630267,5.2466504-3.9833764,11.4768523-6.3976526,17.671926-8.4587079,7.4440129-2.4765682,15.0453122-4.4784825,22.7408667-6.0025642,30.9742816-6.1343643,63.4942532-4.3763655,93.5912191,5.1944538,25.7582231,8.1911014,52.6165814,24.5028327,57.4831599,53.3201275,2.1843643,12.9346459-.9867775,27.2730987-11.1742988,36.1453693-5.0136744,4.3663884-12.0198693,7.2857714-18.7070637,5.6786781-5.860952-1.4085274-11.4684271-6.036534-12.1182915-12.3349763-.6935585-6.7219225,4.1250187-12.8986233,9.6691139-16.1102904,6.7135631-3.8891341,14.7877666-4.4298072,22.365026-4.7084224,13.4432715-.494308,27.0056645-.196496,40.3390836,1.7027423,25.6304167,3.6508467,51.9699637,14.0429431,66.5240258,36.6578874,13.8948936,21.5906902,15.8811204,50.833016,3.5241568,73.5734883-12.2208241,22.4899353-37.2006278,37.2921057-62.7430187,37.6724992-5.9877555.0891734-12.5835652-.2430232-18.0407528-2.9649833-5.0121709-2.4999927-8.616356-7.8263001-5.3768649-13.2429398,2.943026-4.9209309,9.1671055-7.5695912,14.564637-8.6128758,6.3920305-1.2355105,13.3808538-.7930353,19.7366674.4380641,13.1282713,2.5429014,25.4144099,9.1837988,34.4962268,19.032244,9.3210014,10.1078201,14.7522684,23.513988,15.6922639,37.1902932.9406288,13.6855186-2.5987031,27.1115473-10.1450526,38.5603001-7.3058321,11.083858-17.748162,19.8117906-29.0495109,26.6050868-25.9305166,15.5869607-57.1756683,22.9114478-87.2561094,23.1993527-15.2692113.1461441-31.3162346-1.127975-45.9877482-5.5979265-6.7353084-2.0520379-13.5202646-5.4423048-17.5280789-11.4617492-3.4806952-5.2277501-5.0167889-12.4819634-1.2960558-18.0110731,5.6336013-8.3716833,19.3326137-7.1183581,26.1124176-1.0184375,10.3082821,9.2745605,7.4238136,26.2165653,1.2915869,36.9132568-13.9122648,24.2677271-43.8290259,33.1945289-70.0392604,34.7580665-31.6864019,1.8902112-63.6492745-4.3494501-95.0205731,2.474415-13.1666716,2.8640061-25.8822735,8.0980092-36.4314841,16.59819l3.236372,1.6385523c-.0650048-6.5718963-.1300113-13.1437926-.1950196-19.7156889-.0227412-2.2989777-2.9219445-2.3986271-3.9783296-.841957-8.3970627,12.3737605-16.7949148,24.7469722-25.1831709,37.1267044-1.2194962,1.7997825-2.4389923,3.5995651-3.6584884,5.3993477-1.128006,1.6647579.982779,3.4068148,2.5670298,2.9743959,17.9718978-4.9054031,35.9433274-9.8229674,53.9671818-14.5344932"
            stroke="#e4e4e4"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 124 124"
          className={styles.svg_asterisk}
          ref={asteriskRef}
        >
          <path
            fill="#fce300"
            d="m43.184 54.206-35.557.137a7.656 7.656 0 0 0 0 15.313l35.557.138-25.045 25.24a7.657 7.657 0 0 0 10.828 10.827l25.24-25.045.136 35.557a7.657 7.657 0 0 0 15.313 0l.138-35.557 25.24 25.045a7.656 7.656 0 0 0 10.827-10.828l-25.045-25.24 35.557-.137a7.657 7.657 0 0 0 0-15.313l-35.557-.137 25.045-25.24a7.657 7.657 0 0 0-10.828-10.828l-25.24 25.046-.137-35.557a7.657 7.657 0 0 0-15.313 0l-.137 35.557-25.24-25.045a7.657 7.657 0 0 0-10.828 10.828l25.046 25.24Z"
          ></path>
        </svg>

        <ul className={styles.tags_list}>
          {tags.map((tag, index) => (
            <li
              key={index}
              ref={(el) => (tagsRef.current[index] = el)}
              className={styles.tag_item}
            >
              {tag}.
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PinContainer;