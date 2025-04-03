'use client';

import styles from './style.module.scss';
import { useRef, useEffect, useMemo } from 'react';
import useFooterContent from '@/hooks/useFooterContent';
import {bricolage_grotesque} from '@/app/fonts';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import ButtonCopy from '../button-copy';

gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);

const AsideFooterRealization = () => {

  const textBlocksData = useMemo(() => [
    ["Pour rester", "dans"],
    ["la boucle"],
    ["ou", "en ouvrir", "une nouvelle"]
  ], []);

  const baselineStr = "Une seule connexion suffit :"

  const containerRef = useRef(null);
  const textBlocksRef = useRef([]);
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
  const baselineLettersRef = useRef([]);
  /* const buttonRef = useRef(null); */
  const tl1 = useRef(null);
  const tl2 = useRef(null);

  const {showFooterContent, hideFooterContent} = useFooterContent();

  useEffect(() => {
  const container = containerRef.current;
  const textBlocks = textBlocksRef.current;
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
 
  const baselineLetters = baselineLettersRef.current;
  /* const button = buttonRef.current; */

  if (
    !container ||
    textBlocks.length === 0 ||
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
    !circle2 ||
    baselineLetters.length === 0
  ) return;

  const ctx = gsap.context(() => {
      tl1.current = gsap.timeline({
          paused: true,
          defaults: {duration: 3, ease: 'none'},
      });

      tl2.current = gsap.timeline({
          paused: true,
          defaults: {duration: 3, ease: 'none', /* repeat: -1 */},
          onComplete: () => {
              tl2.current.seek(0).invalidate(); // Réinitialisation propre
              tl2.current.play(); // Relance de l'animation
          }
      });

      let mm = gsap.matchMedia(),
          breakPointMin = 768,
          breakPointMax = 1024;

      mm.add(
        {
          isMobile: `(max-width: ${breakPointMin -1}px)`,
          isTablet: `(min-width: ${breakPointMin}px) and (max-width: ${breakPointMax -1}px)`,
          isDesktop: `(min-width: ${breakPointMax}px)`,
        },
      (context) => {
        let {isMobile, isTablet, isDesktop} = context.conditions;

          if (!isMobile) {
            hideFooterContent();

            ScrollTrigger.create({
              trigger: container,
              start: 'bottom bottom',
              onEnter: () => {
                showFooterContent();
              },
              onLeaveBack: () => {
                hideFooterContent();
              }
            })
          };

          if (isMobile || isTablet) {
            ScrollTrigger.create({
              trigger: container,
              start: isMobile ? 'top top' : 'top 70%',
              end: isMobile ? '' : 'bottom bottom',
              scrub: 1,
              snap: isMobile ? 0.25 : 1,
              // markers: true
            });
          }


          ScrollTrigger.create({
            trigger: container,
            start: '25% 25%',
            end: isMobile ? '75% 75%' : 'bottom bottom',
            onEnter: () => {
                tl1.current.play();
                tl2.current.play();
            },
            onLeaveBack: () => {
                tl1.current.reverse();
                tl2.current.reverse();
            },
            onLeave: isMobile ? () => {
                tl1.current.pause();
                tl2.current.pause();
            } : null,
            onEnterBack: isMobile ? () => {
                tl1.current.resume();
                tl2.current.resume();
            }: null,
            // markers: true
        });
      });

      /* ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          scrub: 1,
          snap: 0.25
      }); */

      /* ScrollTrigger.create({
          trigger: container,
          start: '25% 25%',
          end: '75% 75%',
          onEnter: () => {
              tl1.current.play();
              tl2.current.play();
          },
          onLeaveBack: () => {
              tl1.current.reverse();
              tl2.current.reverse();
          },
          onLeave: () => {
              tl1.current.pause();
              tl2.current.pause();
          },
          onEnterBack: () => {
              tl1.current.resume();
              tl2.current.resume();
              // tl1.current.seek(0).pause(); // Remet l'animation au début et la met en pause
              // tl2.current.seek(0).pause();
          },
          // markers: true
      }); */

      // Animate tl1
      tl1.current.addLabel('tl1_start');

      textBlocks.forEach((textBlock, index) => {
          const textItems = Array.from(textBlock.children);
          if (index === 0 || index === 2) {
              const delay = index === 2 ? 2 : 0;

              textItems.forEach((textItem) => {
                  const letters = Array.from(textItem.children);

                  tl1.current.to(letters, {
                      opacity: 1,
                      duration: 1,
                      stagger: 0.05,
                      delay: delay,
                      ease: 'power1.inOut'
                  }, 'tl1_start');
              })
          };
          if (index === 1) {
              textItems.forEach((textItem) => {
                  const letters = Array.from(textItem.children);

                  tl1.current.to(letters, {
                      opacity: 1,
                      scale: 1,
                      duration: 1,
                      ease: 'power1.inOut'
                  }, 'tl1_start+=1')
              })
          };
      });

      tl1.current.to(svg, {
          opacity: 1,
          scale: 1,
          ease: 'power2.inOut'
      }, 'tl1_start')
      tl1.current.to(baselineLetters, {
          opacity: 1,
          duration: 0.5,
          // stagger: 0.05,
          ease: 'power1.inOut'
      }, 'tl1_start+=4')
      /* tl1.current.to(button, {
          y: 0,
          duration: 1,
          ease: 'bounce.out'
      }, '>'); */

      // Animate tl2
      tl2.current.clear(); // Nettoie toute animation précédente pour éviter les accumulations
      tl2.current.addLabel('tl2_start');

      tl2.current.to(circle1, {
          motionPath: {
              path: path1,
              align: path1,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'tl2_start');

      tl2.current.to(circle2, {
          motionPath: {
              path: path2,
              align: path2,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'tl2_start');

      tl2.current.addLabel('first_half', '>');

      tl2.current.to(group2, {
          rotate: -10,
          transformOrigin: "center",
          duration: 1.5
      }, 'tl2_start+=2');

      tl2.current.to(circle1, {
          motionPath: {
              path: path2,
              align: path2,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'first_half');

      tl2.current.to(circle2, {
          motionPath: {
              path: path1,
              align: path1,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'first_half');

      tl2.current.addLabel('one_round', '>');

      tl2.current.to(circle1, {
          motionPath: {
              path: path3,
              align: path3,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'one_round');

      tl2.current.to(circle2, {
          motionPath: {
              path: path4,
              align: path4,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'one_round');

      tl2.current.addLabel('one_and_a_half', '>');

      tl2.current.to(group1, {
          rotate: -10,
          transformOrigin: "center",
          duration: 1.5
      }, 'one_round+=1');

      /* tl2.current.to([star1, star2], {
        opacity: 1,
        scale: 0.35,
        duration: 1,
        ease: 'bounce.out',
        delay: 0.2
      })
      .to([star1, star2], {
        rotation: 360,
        duration: 1.5,
        ease: 'power4.out',
      })
      .to([star1, star2], {
        opacity: 0,
        scale: 0.25,
        duration: 1,
      }); */

      tl2.current.to(circle1, {
          motionPath: {
              path: path4,
              align: path4,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'one_and_a_half');

      tl2.current.to(circle2, {
          motionPath: {
              path: path3,
              align: path3,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'one_and_a_half');

      tl2.current.addLabel('two_rounds', '>');

      tl2.current.to(group1, {
          rotate: 0,
          transformOrigin: "center",
          duration: 1.5
      }, 'two_rounds+=1');

      tl2.current.to(circle1, {
          motionPath: {
              path: path3,
              align: path3,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'two_rounds');

      tl2.current.to(circle2, {
          motionPath: {
              path: path4,
              align: path4,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'two_rounds');

      tl2.current.addLabel('two_and_a_half', '>');

      tl2.current.to(circle1, {
          motionPath: {
              path: path1,
              align: path1,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'two_and_a_half');

      tl2.current.to(circle2, {
          motionPath: {
              path: path2,
              align: path2,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'two_and_a_half');

      tl2.current.addLabel('three_rounds', '>');

      tl2.current.to(group2, {
          rotate: 0,
          transformOrigin: "center",
          duration: 1.5
      }, 'three_rounds');

      tl2.current.to(circle1, {
          motionPath: {
              path: path2,
              align: path2,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'three_rounds');

      tl2.current.to(circle2, {
          motionPath: {
              path: path1,
              align: path1,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
          }
      }, 'three_rounds');



  });

  return () => ctx.revert();

  }, [showFooterContent, hideFooterContent]);

  return (
    <div ref={containerRef} className={styles.aside_footer_realization}>
      <aside className={styles.aside}>
        <div className={styles.content}>
          <div className={styles.content_body}>
            <div className={styles.text_container} aria-label="Restez dans la boucle ou ouvrez-en une nouvelle.">
              {textBlocksData.map((texts, index) => (
                <div 
                  key={`text-block-${index}`} 
                  className={clsx(
                      styles.text_block, 
                      { 
                          [styles.text_block_start]: index === 0,
                          [styles.text_block_center]: index === 1,
                          [styles.text_block_end]: index === 2,
                      }
                  )}
                  ref={(el) => textBlocksRef.current[index] = el}
                >
                  {texts.map((t, i) => (
                    <div 
                        key={`text-item-${index}-${i}`} 
                        className={styles.text_item}
                    >
                      {t.split('').map((letter, j) => (
                          letter === " " ? (
                              <span key={`text-item-${index}-${i}-letter-${j}`} className={styles.letter}>&nbsp;</span>
                          ) : (
                              <span key={`text-item-${i}-letter-${j}`} className={clsx(bricolage_grotesque.className, styles.letter)}>{letter}</span>
                          )
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
                  
            <div className={styles.svg_container}>
              <svg ref={svgRef} viewBox="0 0 500 500" /* width="100%" height="100%" */ preserveAspectRatio="xMidYMid meet">
                <g ref={group1Ref}>
                  <path
                    d="M222.55,174.57c2.24-.63,4.49-1.24,6.75-1.85,117.36-31.45,221.77-22.34,233.21,20.33s-71.16,100.46-185.05,132.37"
                    fill="none"
                    stroke="#1e1e1e"
                    strokeWidth="1"
                  />

                  <path
                    d="M277.45,325.43c-2.24.63-4.49,1.24-6.75,1.85-117.36,31.45-221.77,22.34-233.21-20.33-11.22-41.86,71.16-100.46,185.05-132.37"
                    fill="none"
                    stroke="#1e1e1e"
                    strokeWidth="1"
                  />
                </g>
                  
                <g ref={group2Ref}>
                  <path
                      d="M222.55,174.57c2.24-.63,4.49-1.24,6.75-1.85,117.36-31.45,221.77-22.34,233.21,20.33s-71.16,100.46-185.05,132.37"
                      fill="none"
                      stroke="#1e1e1e"
                      strokeWidth="1"
                  />

                    <path
                        d="M277.45,325.43c-2.24.63-4.49,1.24-6.75,1.85-117.36,31.45-221.77,22.34-233.21-20.33-11.22-41.86,71.16-100.46,185.05-132.37"
                        fill="none"
                        stroke="#1e1e1e"
                        strokeWidth="1"
                    />
                </g>
                  
                {/* None visible paths only used for motion */}
                <path
                  ref={path1Ref}
                  d="M222.55,174.57c2.24-.63,4.49-1.24,6.75-1.85,117.36-31.45,221.77-22.34,233.21,20.33s-71.16,100.46-185.05,132.37"
                  fill="none"
                  stroke="none"
                  strokeWidth="1"
                />
                <path
                  ref={path2Ref}
                  d="M277.45,325.43c-2.24.63-4.49,1.24-6.75,1.85-117.36,31.45-221.77,22.34-233.21-20.33-11.22-41.86,71.16-100.46,185.05-132.37"
                  fill="none"
                  stroke="none"
                  strokeWidth="1"
                />
                <path
                  ref={path3Ref}
                  d="M222.55,174.57c107.75-48.76,208.53-56.82,226.84-17.55,18.67,40.04-55.46,114.13-165.58,165.48-2.12.99-4.24,1.96-6.36,2.92"
                  fill="none"
                  stroke="none"
                  strokeWidth="1"
                />
                <path
                  ref={path4Ref}
                  d="M277.45,325.43c-107.75,48.76-208.53,56.82-226.84,17.55s55.46-114.13,165.58-165.48c2.12-.99,4.24-1.96,6.36-2.92"
                  fill="none"
                  stroke="none"
                  strokeWidth="1"
                />

                <circle ref={circle1Ref} r="10" fill="#fce300" /* fill="#1e1e1e" */ />
                  
                <circle ref={circle2Ref} r="10" fill="#fce300" /* fill="#1e1e1e" */ />

                {/* Stars shapes */}
                <g ref={star1Ref} className={styles.star} clipPath="url(#clip0_118_208)" /* transform="translate(350, 30)" */ /* scale(0.35) */>
                  <path
                    d="M100 200C97.1048 105.262 94.738 102.91 0 100C94.738 97.1048 97.0903 94.738 100 0C102.895 94.738 105.262 97.0903 200 100C105.262 102.91 102.91 105.233 100 200Z" 
                    fill="black"
                  />
                </g>
                <g ref={star2Ref} className={styles.star} clipPath="url(#clip0_118_208)" /* transform="translate(70, 400)" */ /* scale(0.35) */>
                  <path
                      d="M100 200C97.1048 105.262 94.738 102.91 0 100C94.738 97.1048 97.0903 94.738 100 0C102.895 94.738 105.262 97.0903 200 100C105.262 102.91 102.91 105.233 100 200Z" 
                      fill="black"
                  />
                </g>

                <clipPath id="clip0_118_208"> 
                    <rect width="200" height="200" fill="black"/> 
                </clipPath>
              </svg>
            </div>
          </div>
          <div className={styles.content_footer}>
            <div className={styles.baseline} aria-label="Une seule connexion suffit :">
              {baselineStr.split('').map((letter, i) => (
                letter === " " ? (
                    <span 
                        key={`baseline-letter-${i}`} 
                        className={styles.letter} 
                        ref={(el) => baselineLettersRef.current[i] = el}
                    >
                        &nbsp;
                    </span>
                ) : (
                    <span 
                        key={`text-item-${i}-letter-${i}`} 
                        className={styles.letter} 
                        ref={(el) => baselineLettersRef.current[i] = el}
                    >
                        {letter}
                    </span>
                )
              ))}
            </div>
            <ButtonCopy />
          </div>
        </div>
      </aside>
    </div>
  )
}

export default AsideFooterRealization;