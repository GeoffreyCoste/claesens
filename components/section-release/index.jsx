'use client';

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

        const getDynamicRadius = () => {
            const contentWidth = content.offsetWidth;
            const contentHeight = content.offsetHeight;
            return Math.sqrt(contentWidth ** 2 + contentHeight ** 2); // Diagonale
        };

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
                  attr: {r: getDynamicRadius()}, // Enlarge the circle to reveal more content
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
                    attr: { r: getDynamicRadius() }, // Enlarge the circle to reveal more content
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
                    attr: { r: getDynamicRadius() }, // Agrandit le cercle pour révéler plus de contenu
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

export default SectionReleaseNew;

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