'use client';

import styles from './style.module.scss';
import { useState, useRef, useLayoutEffect } from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import { h2SectionRelease } from '../animate-heading/data';
import ReleaseList from './release-list';
import releases from './release-list/data';
import Button from '../button';
import MaskReveal from '../mask-reveal';

const SectionReleaseNew = () => {
  const [sectionHeight, setSectionHeight] = useState(0);
  const [maskValues, setMaskValues] = useState({
    maskRadius: 0,
    maskHeight: 0,
    maskMarginTop: 0,
  });

  const contentRef = useRef(null);
  
  const {mobile, tablet} = useMediaQueries();

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const rect = content.getBoundingClientRect();
    const contentWidth = rect.width;
    const contentHeight = rect.height;

    const radius = Math.max(contentHeight, contentWidth / 2);

    const maskRadius = radius * 1.05;   // petite marge de sécurité
    const maskHeight = tablet ? maskRadius * 3 : maskRadius * 2;  // diamètre complet du cercle
    const maskMarginTop = -(maskHeight * (mobile ? 0.4 : 0.25));  // pour aligner le centre du cercle sur le haut du contenu
    const sectionHeight = maskHeight + maskMarginTop;

    console.group("Mask Debug");
    console.log("contentWidth:", contentWidth);
    console.log("contentHeight:", contentHeight);
    console.log("radius:", radius);
    console.log("maskRadius:", maskRadius);
    console.log("maskHeight:", maskHeight);
    console.log("maskMarginTop:", maskMarginTop);
    console.log("sectionHeight:", sectionHeight);
    console.groupEnd();

    // const adjustedMaskHeight = mobile ? maskHeight : maskHeight * 1.5;

    setMaskValues({ maskRadius, maskHeight/* : adjustedMaskHeight */, maskMarginTop });
    setSectionHeight(sectionHeight);
  }, [mobile, tablet]);

  return (
    <section
      className={styles.section_release}
      style={{ height: sectionHeight }}
    >
      <div className={styles.container}>
        <MaskReveal maskValues={maskValues}>
          <div ref={contentRef} className={styles.content}>
            <div className={styles.content_inner}>
              <AnimateStagger isTextCentered={true}>
                {h2SectionRelease.map((text, index) => (
                  <AnimateHeading key={index} isWhite={true} {...text} />
                ))}
                <AnimateFade>
                  <p className={styles.text}>
                    Découvrez quelques-unes de mes créations originales.
                  </p>
                </AnimateFade>
              </AnimateStagger>
              <ReleaseList items={releases} />
              <Button pathname={'realisations'} title={'tout voir'} outline />
            </div>
          </div>
        </MaskReveal>
      </div>
    </section>
  );
};

export default SectionReleaseNew;




/* 'use client';

import styles from './style.module.scss';
import { useState, useRef, useLayoutEffect } from 'react';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import { h2SectionRelease } from '../animate-heading/data';
import ReleaseList from './release-list';
import releases from './release-list/data';
import Button from '../button';
import MaskReveal from '../mask-reveal';

const SectionReleaseNew = () => {
    const [sectionHeight, setSectionHeight] = useState(0);
    const [maskValues, setMaskValues] = useState({
        maskHeight: 0,
        maskMaxSize: 0,
        maskMarginTop: 0
    });

    const contentRef = useRef(null);


    useLayoutEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const rect = content.getBoundingClientRect();
        const contentWidth = rect.width;
        const contentHeight = rect.height;

        // Rayon du cercle qui couvre le bloc
        const radius = Math.sqrt(
          Math.pow(contentWidth, 2) + Math.pow(contentHeight, 2)
        ) / 2;

        console.log('Radius: ', radius);

        const maskHeight = radius * 2;
        const maskMaxSize = maskHeight * 2;

        // marge pour centrer le mask (à ajuster suivant animation)
        const maskMarginTop = -(maskMaxSize * 0.3);

        // hauteur de section
        const sectionHeight = maskMaxSize - Math.abs(maskMarginTop);

        setMaskValues({ maskHeight, maskMaxSize, maskMarginTop});
        setSectionHeight(sectionHeight);
    }, []);

    return (
        <section className={styles.section_release} style={{ height: sectionHeight}}>
            <div className={styles.container}>
                <MaskReveal maskValues={maskValues} >
                    <div ref={contentRef} className={styles.content}>
                        <div className={styles.content_inner}>
                            <AnimateStagger isTextCentered={true}>
                                {h2SectionRelease.map((text, index) => (
                                <AnimateHeading key={index} isWhite={true} {...text} />
                                ))}
                                <AnimateFade>
                                <p className={styles.text}>
                                    Découvrez quelques-unes de mes créations originales.
                                </p>
                                </AnimateFade>
                            </AnimateStagger>
                            <ReleaseList items={releases} />
                            <Button pathname={'realisations'} title={'tout voir'} outline />
                        </div>
                    </div>
                </MaskReveal>
            </div>
        </section>
    );
};

export default SectionReleaseNew; */














/* 'use client';

import styles from './style.module.scss';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import { h2SectionRelease } from '../animate-heading/data';
import ReleaseList from './release-list';
import releases from './release-list/data';
import Button from '../button';

gsap.registerPlugin(ScrollTrigger);

const SectionReleaseNew = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const clipPathRef = useRef(null);
    const contentRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {
        const updateContainerHeight = () => {
            if (sectionRef.current && containerRef.current && contentRef.current) {
                const contentHeight = contentRef.current.offsetHeight;
                sectionRef.current.style.height = `${contentHeight + 200}px`;
                containerRef.current.style.height = `${contentHeight}px`;
            }
        };
    
        updateContainerHeight();
    
        window.addEventListener('resize', updateContainerHeight);
        return () => window.removeEventListener('resize', updateContainerHeight);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const clipPath = clipPathRef.current;
        const content = contentRef.current;
        const inner = innerRef.current;
        if (!section || !container || !clipPath || !content || !inner) return;

        const mm = gsap.matchMedia();

        mm.add('(max-width: 767px)', () => {
            const ctx = gsap.context(() => {
                gsap.set(content, { y: '-55%' })

                gsap.to(content, 
                    { 
                        autoAlpha: 1, 
                        duration: 0.25, 
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: container,
                            start: 'top bottom',
                            end: '+=30',
                            scrub: true,
                        }
                    },
                );

                gsap.to(clipPath, {
                  attr: {r: 900}, // Enlarge the circle to reveal more content
                  scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true,
                    pin: content
                  }
                });

                gsap.to(inner, {
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                });

            });
            return () => ctx.revert();
        });

        mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
            const ctx = gsap.context(() => {

                gsap.to(content, 
                    {
                        autoAlpha: 1, 
                        duration: 0.25, 
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: container,
                            start: 'top bottom',
                            end: '+=30',
                            scrub: true,
                            // markers: true
                        }
                    },
                );

                gsap.to(clipPath, {
                    attr: { r: 800 }, // Enlarge the circle to reveal more content
                    scrollTrigger: {
                        trigger: container,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: true,
                        pin: content,
                    }
                });

                gsap.to(inner, {
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                }, '<');
            });

            return () => ctx.revert();
        });

        mm.add('(min-width: 1024px)', () => {
            const ctx = gsap.context(() => {

                gsap.to(content, 
                    {
                        autoAlpha: 1, 
                        duration: 0.25, 
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: container,
                            start: 'top bottom',
                            end: '+=30',
                            scrub: true,
                        }
                    },
                );

                gsap.to(clipPath, {
                    attr: { r: 800 }, // Agrandit le cercle pour révéler plus de contenu
                    scrollTrigger: {
                        trigger: container,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: true,
                        pin: content,
                    }
                });

                gsap.to(inner, {
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                }, '<');
            });

            return () => ctx.revert();
        });

        return () => mm.revert();

    }, []);

    return (
        <section ref={sectionRef} className={styles.section_release}>

            <div ref={containerRef} className={styles.container}>
                <svg className={styles.svg} width="100%" height="50%">
                    <defs>
                        <clipPath id="clipCircle" clipPathUnits="userSpaceOnUse">
                            <circle ref={clipPathRef} cx="50%" cy="100%" r="40" />
                        </clipPath>
                    </defs>
                </svg>
                <div ref={contentRef} className={styles.content} style={{ clipPath: 'url(#clipCircle)' }}>
                    <div ref={innerRef} className={styles.content_inner}>
                      <AnimateStagger isTextCentered={true}>
                        {h2SectionRelease.map((text, index) => (
                          <AnimateHeading key={index} isWhite={true} {...text} />
                        ))}
                        <AnimateFade>
                          <p className={styles.text}>
                            Découvrez quelques-unes de mes créations originales.
                          </p>
                        </AnimateFade>
                      </AnimateStagger>
                      <ReleaseList items={releases} />
                      <Button pathname={'realisations'} title={'tout voir'} outline />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionReleaseNew; */