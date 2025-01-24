'use client';

import styles from './style.module.scss';
import {bricolage_grotesque} from '@/app/fonts';
import {useState, useRef, useEffect, useCallback} from 'react';
import {useSliderMenu} from '@/hooks/useSliderMenu';
import useMediaQueries from '@/hooks/useMediaQueries';
import clsx from 'clsx';
import gsap from 'gsap';
import ButtonToggle from '../button-toggle';
import {slides as defaultSlides} from './data';

const SliderMenu = ({datas = defaultSlides}) => {
  /*** States and Refs ***/
  const {desktop} = useMediaQueries();
  const {isOpen, toggleIsOpen} = useSliderMenu();
  const [slidesData, setSlidesData] = useState([]);
  const [minSlides, setMinSlides] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntroNeeded, setIsIntroNeeded] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const slidesRef = useRef([]); // Reference for slide elements
  const headingRef = useRef(null); // Reference for the page title
  const togglerRef = useRef(null); // Reference for toggler button
  const activeLabelRef = useRef(null); // Reference for active slide label
  const isThrottled = useRef(false); // Prevent rapid event triggers
  const touchStartX = useRef(null); // Store X position of touch start
  const touchEndX = useRef(null); // Store X position of touch end

  /*** Constants and Helpers ***/
  const width = 320;

  // Rotate datas array by n positions
  const arrayRotate = (arr, n) => {
    const len = arr.length;
    const normalized = ((n % len) + len) % len; // Gère les rotations négatives ou trop grandes

    return [...arr.slice(normalized), ...arr.slice(0, normalized)];
  };

  /*** Event Handlers ***/
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX; // Capture la position X du toucher initial
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX; // Capture la position X pendant le mouvement
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const deltaX = touchEndX.current - touchStartX.current;

    if (Math.abs(deltaX) > 50) {
      // Seuil pour détecter un swipe
      if (deltaX > 0) {
        // Swipe vers la droite
        setCurrentIndex((prev) => prev - 1);
      } else {
        // Swipe vers la gauche
        setCurrentIndex((prev) => prev + 1);
      }
    }

    // Réinitialisez les références
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Throttling function to manage scroll events
  const handleScroll = useCallback(
    (event) => {
      if (!isOpen || isIntroNeeded || isThrottled.current) return; // Ignore calls during throttling

      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false; // Release after delay
      }, 300); // Throttle delay: 300ms

      if (event.deltaY > 0) {
        // Scroll down
        setCurrentIndex((prev) => prev + 1);
      } else if (event.deltaY < 0) {
        // Scroll up
        setCurrentIndex((prev) => prev - 1);
      }
    },
    [isOpen, isIntroNeeded]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (!isOpen || isIntroNeeded) return;

      if (event.key === 'ArrowRight') {
        // Right arrow: go to next slide
        setCurrentIndex((prev) => prev + 1);
      } else if (event.key === 'ArrowLeft') {
        // Left arrow: aller à la carte précédente
        setCurrentIndex((prev) => prev - 1);
      }
    },
    [isOpen, isIntroNeeded]
  );

  const toggleSlider = () => {
    if (!slidesRef.current[activeIndex] || isIntroNeeded || isAnimating) return;

    isOpen ? showPreview() : showSlider();
    toggleIsOpen();
  };

  const showSlider = () => {
    setIsAnimating(true);

    gsap
      .timeline({
        defaults: {
          duration: 1.2,
          ease: 'power4.inOut'
        },
        onComplete: () => setIsAnimating(false)
      })
      .addLabel('start', 0)

      // Current slide
      .to(
        slidesRef.current[activeIndex],
        {
          clipPath: 'inset(22% 39% round 23vw)'
        },
        'start'
      )
      .to(
        slidesRef.current.map((slide) =>
          slide.querySelector(`.${styles.slide_bg}`)
        ),
        {
          scale: 0.8
        },
        'start'
      )

      // Slide title
      .to(
        slidesRef.current.map((slide) =>
          slide.querySelector(`.${styles.slide_overlay}`)
        ),
        {
          duration: 1,
          scaleY: 0
        },
        'start'
      );
  };

  const showPreview = () => {
    setIsAnimating(true);

    gsap
      .timeline({
        defaults: {
          duration: 1.2,
          ease: 'expo.inOut'
        },
        onComplete: () => setIsAnimating(false)
      })
      .addLabel('start', 0)

      // Current slide
      .fromTo(
        slidesRef.current[activeIndex],
        {
          clipPath: 'inset(22% 39% round 23vw)'
        },
        {
          clipPath: 'inset(0% 0% round 0vw)'
        } /* , 'clip+=0.1' */
      )
      .addLabel('clip', 'start+=0.15')

      // Current slide background
      .to(
        slidesRef.current[activeIndex].querySelector(`.${styles.slide_bg}`),
        {
          scale: 1
        },
        'clip'
      )

      // filter
      .fromTo(
        slidesRef.current[activeIndex].querySelector(`.${styles.slide_bg}`),
        {
          filter: 'brightness(100%) saturate(100%)'
        },
        {
          duration: 0.4,
          ease: 'power1.in',
          filter: 'brightness(200%) saturate(200%)'
        },
        'clip+=0.1'
      )
      .to(
        slidesRef.current[activeIndex].querySelector(`.${styles.slide_bg}`),
        {
          duration: 0.8,
          ease: 'power1',
          filter: 'brightness(100%) saturate(100%)'
        },
        'clip+=0.4'
      )

      // Current slide title
      .to(
        slidesRef.current[activeIndex].querySelector(
          `.${styles.slide_overlay}`
        ),
        {
          duration: 1,
          scaleY: 1
        },
        'clip'
      );
  };

  useEffect(() => {
    if (!isOpen || isIntroNeeded) return;
    // Ajouter un gestionnaire d'événements pour `keydown` lors du montage
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Nettoyer l'événement lors du démontage
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isIntroNeeded, handleKeyDown]);

  useEffect(() => {
    setMinSlides(desktop ? 5 : 3);
  }, [desktop]);

  useEffect(() => {
    if (datas && datas.length >= minSlides) {
      const tripled = [...datas, ...datas, ...datas];

      const isEven = datas.length % 2 === 0;
      const centerIndex = isEven
        ? Math.floor(datas.length / 2)
        : Math.ceil(datas.length / 2) - 1;

      const newSlides = arrayRotate(tripled, currentIndex - centerIndex);
      setSlidesData(newSlides);
    }
  }, [datas, minSlides, currentIndex]);

  useEffect(() => {
    // Check if slidesRef contains valid references
    if (!slidesRef.current || slidesRef.current.length === 0) return;

    const centerIndex = Math.floor(slidesData.length / 2);

    // Browse all slides to add/remove the 'current' class
    slidesRef.current.forEach((slide, index) => {
      if (slide) {
        // Check if index is equal to centralIndex
        if (index === centerIndex) {
          slide.className = `${styles.slide} ${styles.active}`; // Add 'current' class
          setActiveIndex(index);
        } else {
          slide.className = styles.slide; // Reinitialize class basis
        }
      }
    });
  }, [slidesData, activeIndex]);

  useEffect(() => {
    if (
      !isIntroNeeded ||
      !headingRef.current ||
      !togglerRef.current ||
      !activeLabelRef.current ||
      slidesRef.current.length === 0 ||
      slidesData.length === 0
    )
      return;

    const centerIndex = Math.floor(slidesData.length / 2);

    const tl = gsap.timeline({
      defaults: {duration: 1, ease: 'power2.out'},
      onComplete: () => setIsIntroNeeded(false)
    });

    tl.set(slidesRef.current, {
      opacity: 0,
      x: 0 // Empilées au centre
    });

    tl.fromTo(
      slidesRef.current[centerIndex],
      {
        opacity: 0,
        scale: 0.5
      },
      {
        opacity: 1,
        scale: 1
      }
    );

    tl.fromTo(
      headingRef.current,
      {
        y: -500,
        scale: 10
      },
      {
        y: 0,
        scale: 1
      },
      '<'
    );

    tl.to(slidesRef.current, {
      x: (i) => {
        const distFromCenter = Math.abs(i - centerIndex);
        const adjustedOffset =
          distFromCenter === 1 ? (i < centerIndex ? -30 : 30) : 0;
        return (i - centerIndex) * width + adjustedOffset;
      },
      scale: (i) => 1 - Math.abs(i - centerIndex) * 0.2,
      opacity: 1
    });

    tl.fromTo(
      togglerRef.current,
      {
        y: 300
      },
      {
        y: 0
      }
    );

    tl.fromTo(
      activeLabelRef.current,
      {
        y: -300,
        scale: 2
      },
      {
        y: 0,
        scale: 1
      },
      '<'
    );
  }, [isIntroNeeded, slidesData]);

  useEffect(() => {
    if (!isIntroNeeded && slidesRef.current.length && slidesData.length) {
      const centerIndex = Math.floor(slidesData.length / 2);

      slidesRef.current.forEach((el, index) => {
        if (!el) return; // Skip if ref is null

        const distFromCenter = Math.abs(index - centerIndex);
        const adjustedOffset =
          distFromCenter === 1 ? (index < centerIndex ? -30 : 30) : 0;
        const offset = (index - centerIndex) * width + adjustedOffset;
        const scale = 1 - distFromCenter * 0.2;

        // Apply GSAP animation
        gsap.to(el, {
          x: offset,
          scale: scale,
          duration: 0.5,
          ease: 'power3.out'
        });
      });
    }
  }, [isIntroNeeded, slidesData, currentIndex]);

  return (
    <div className={`${styles.menu} ${styles.menu_slider}`}>
      <div
        className={styles.slider}
        onWheel={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.slides}>
          {slidesData.map((slide, index) => (
            <div
              key={`${index + currentIndex}`}
              ref={(el) => (slidesRef.current[index] = el)}
              className={styles.slide}
            >
              <div
                className={styles.slide_bg}
                style={{backgroundImage: `url(${slide.img})`}}
              ></div>
              <div
                className={clsx(
                  bricolage_grotesque.className,
                  styles.slide_overlay
                )}
              >
                {slide.text}
              </div>
            </div>
          ))}
        </div>
        <div
          ref={activeLabelRef}
          className={clsx(bricolage_grotesque.className, styles.active_label)}
        >
          {slidesData[activeIndex]?.text}
        </div>
        <div
          onClick={() => {
            setCurrentIndex((prev) => prev - 1);
          }}
          className={`${styles.button} ${styles.prev}`}
        >
          {'⏪'}
        </div>
        <div
          onClick={() => {
            setCurrentIndex((prev) => prev + 1);
          }}
          className={`${styles.button} ${styles.next}`}
        >
          {'⏩'}
        </div>
      </div>

      <div ref={togglerRef} className={styles.toggler}>
        <ButtonToggle text={'Voir'} toggle={toggleSlider} />
      </div>

      <div ref={headingRef} className={styles.heading}>
        <h1 className={clsx(bricolage_grotesque.className, styles.title)}>
          Réalisations
        </h1>
      </div>
    </div>
  );
};

export default SliderMenu;

/* const centerIndex = Math.floor(slidesData.length / 2);
const distFromCenter = Math.abs(index - centerIndex);
const adjustedOffset =
  distFromCenter === 1 ? (index < centerIndex ? -30 : 30) : 0;
const offset = (index - centerIndex) * width + adjustedOffset;
const scale = 1 - distFromCenter * 0.2;
const key = index + currentIndex;
const slideStyle = {
  transform: `
        translateX(${offset}px)
        scale(${scale}, ${scale})
    `
}; */
