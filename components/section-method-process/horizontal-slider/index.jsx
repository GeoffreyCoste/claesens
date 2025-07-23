'use client';

import styles from './style.module.scss';
import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ShaderScene from './shader-scene';
import SliderWidget from './slider-widget';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HorizontalSlider = () => {
    const [containerHeight, setContainerHeight] = useState('100vh');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isDotNavigationScrolling, setIsDotNavigationScrolling] = useState(false);
    const containerRef = useRef(null);
    const sliderRef = useRef(null);
    const slidesContainerRef = useRef(null);
    const slidesRef = useRef([]);
    const scrollTriggerRef = useRef(null);
    const sceneRef = useRef(null);
    const tweenRef = useRef(null);

    useLayoutEffect(() => {
      const container = containerRef.current;
      const slider = sliderRef.current;
      const slidesContainer = slidesContainerRef.current;
      const slides = slidesRef.current;
      const scene = sceneRef.current;
      if (!container || !scene || !slider || !slidesContainer || slides.length === 0) return;
    
      const totalSlides = slides.length;
      setContainerHeight(`${(totalSlides + 1) * 100}vh`);
    
      const ctx = gsap.context(() => {
        gsap.fromTo(scene,
          {
            opacity: 0,
            // y: 50
            scale: 0.85,
          },
          {
            opacity: 1,
            // y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slider,
              start: 'top 30%', // ou ajuste selon ton design
              end: 'top top',
              scrub: true,
              // toggleActions: 'play none none reverse',
              // markers: true
            }
          }
        );

        const tween = gsap.to(slides, {
          ease: "none",
          duration: totalSlides,
          xPercent: -(100 * (totalSlides - 1)),
          scrollTrigger: {
            trigger: slidesContainer,
            start: "center center",
            end: "+=" + 100 * totalSlides + "%",
            scrub: true,
            pin: slider,
            snap: 1 / (totalSlides - 1),
            onUpdate: (self) => {
              const slideIndex = Math.round(self.progress * (totalSlides - 1));
              setCurrentSlide(slideIndex);
    
              if (slideIndex >= 1 && slideIndex <= totalSlides - 2) {
                setActiveIndex(slideIndex - 1);
              } else {
                setActiveIndex(null);
              }
            },
            // markers: true,
          }
        });

        gsap.fromTo(scene, 
          {
            opacity: 1,
            scale: 1,
          },
          {
            opacity: 0,
            scale: 0.85,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slider, // même élément que le ScrollTrigger avec pin
              start: `bottom+=1 bottom`, // juste après la fin du pin
              toggleActions: 'play none none reverse',
              // markers: true
            },
            immediateRender: false
          }
        );

        tweenRef.current = tween;
        scrollTriggerRef.current = tween.scrollTrigger;
      });
    
      return () => ctx.revert();
    }, []);

    const handleDotClick = (dotIndex) => {
        const targetSlideIndex = dotIndex + 1; // car slides 1 à 4
        // setCurrentSlide(targetSlideIndex);
        if (scrollTriggerRef.current) {
          const st = scrollTriggerRef.current;
          const totalScroll = st.end - st.start;
          const targetProgress = targetSlideIndex / (slidesRef.current.length - 1);

          setIsDotNavigationScrolling(true); 

          gsap.to(window, {
            scrollTo: {
              y: st.start + targetProgress * totalScroll,
              autoKill: false,
            },
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
              setTimeout(() => {
                setIsDotNavigationScrolling(false);
              }, 50);
            }
          });
        }
    };

    const handleControlerClick = (direction) => {
      const totalSlides = slidesRef.current.length;
      let targetIndex = currentSlide;

      const minIndex = 1;
      const maxIndex = totalSlides - 2;

      if (direction === 'next' && currentSlide < maxIndex) {
        targetIndex += 1;
      } else if (direction === 'prev' && currentSlide > minIndex) {
        targetIndex -= 1;
      } else {
        return; // Ne rien faire si on sort des limites actives
      }
    
      const st = scrollTriggerRef.current;
      if (st) {
        const totalScroll = st.end - st.start;
        const targetProgress = targetIndex / (totalSlides - 1);
      
        gsap.to(window, {
          scrollTo: {
            y: st.start + targetProgress * totalScroll,
            autoKill: false,
          },
          duration: 1,
          ease: 'power2.inOut',
        });
      }
    }

    return (
        <div ref={containerRef} className={styles.horizontal_slider_container} style={{height: containerHeight}}>
            <div ref={sliderRef} className={styles.slider}>
                <div ref={slidesContainerRef} className={styles.slides}>
                    {Array.from({ length: 6 }, (_, index) => (
                        <div key={`slide-${index}`} ref={(el) => slidesRef.current[index] = el} className={styles.slide}></div>
                    ))}
                </div>

                {slidesRef.current.length > 0 && currentSlide > 0 && currentSlide < slidesRef.current.length - 1  && <SliderWidget activeIndex={activeIndex} dotsLength={slidesRef.current.length - 2} handleDotClick={handleDotClick} handleControlerClick={handleControlerClick} />}
                
                <div ref={sceneRef} className={styles.scene}>
                  {tweenRef.current && slidesRef.current.length > 0 && (
                    <ShaderScene sliderRef={sliderRef} slidesRef={slidesRef} tweenRef={tweenRef} activeIndex={activeIndex} isDotNavigationScrolling={isDotNavigationScrolling} />
                  )}
                </div>
            </div>
        </div>
    )
}

export default HorizontalSlider;