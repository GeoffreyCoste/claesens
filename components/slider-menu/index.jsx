'use client';

import styles from './style.module.scss';
import {bricolage_grotesque} from '@/app/fonts';
import {useState, useRef, useEffect, useCallback} from 'react';
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';
import useSliderMenu from '@/hooks/useSliderMenu';
import {useMedia} from '@/hooks/useMedia';
import useSliderData from '@/hooks/useSliderData';
import useSliderNavigation from '@/hooks/useSliderNavigation';
import useSliderActiveSlideAnimation from '@/hooks/useSliderActiveSlideAnimation';
import useSliderPositionAnimation from '@/hooks/useSliderPositionAnimation';
import useTransitionRoutes from '@/hooks/useTransitionRoutes';
import clsx from 'clsx';
import ButtonToggle from '../button-toggle';
import {slides as defaultSlides, clipPathValues} from './data';
import SwipeIndicator from '../swipe-indicator';
import SpinningBadge from '../spinning-badge';

const SliderMenu = ({datas = defaultSlides}) => {
  /*** States and Refs ***/
  const {isHydrated, matches} = useMedia();
  const {sm, mobile, tablet, desktop, xl, xxl, xxxl, ultra} = matches;
  const {
    isSliderMenuOpen,
    toggleIsSliderMenuOpen,
    openSliderMenu,
    closeSliderMenu
  } = useSliderMenu();
  const router = useRouter();
  const pathname = usePathname();
  const [slideWidth, setSlideWidth] = useState(320);
  /* const [slideWidth, setSlideWidth] = useState(
    ultra || xxxl || xxl ? window.innerWidth / 4.25 : 320
  ); */
  const [minSlides, setMinSlides] = useState(5);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSnapIndex, setActiveSnapIndex] = useState(null);
  const [isSnapItemClicked, setIsSnapItemClicked] = useState(false);
  const [isIntroNeeded, setIsIntroNeeded] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const slidesRef = useRef([]); // Reference for slide elements
  const snapItemsRef = useRef([]); // Reference for snap items
  const headingRef = useRef(null); // Reference for the page title
  const togglerRef = useRef(null); // Reference for toggler button
  const activeLabelRef = useRef(null); // Reference for active slide label

  const slug = pathname.startsWith('/realisations/')
    ? pathname.replace('/realisations/', '')
    : null;

  const clipPath = ultra
    ? clipPathValues.ultra
    : xxxl
      ? clipPathValues.xxxl
      : xxl
        ? clipPathValues.xxl
        : xl
          ? clipPathValues.xl
          : tablet
            ? clipPathValues.tablet
            : sm
              ? clipPathValues.sm
              : clipPathValues.xs;

  const {
    currentIndex,
    setCurrentIndex,
    handleScroll,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
    hasSwiped,
    hasScrolled
  } = useSliderNavigation({
    isSliderMenuOpen,
    isIntroNeeded,
    initialIndex: 0
  });

  const {slidesData, triplets} = useSliderData({
    datas,
    minSlides,
    currentIndex,
    slug
  });

  const {showSlider, showPreview} = useSliderActiveSlideAnimation({
    slidesRef,
    activeIndex,
    clipPath,
    isAnimating,
    setIsAnimating,
    styles
  });

  useSliderPositionAnimation({
    slidesRef,
    slidesData,
    slideWidth,
    isIntroNeeded,
    mobile,
    desktop,
    activeIndex,
    styles,
    setIsIntroNeeded, // If intro state is managed by a setter
    togglerRef,
    activeLabelRef,
    headingRef
  });

  const handleSnapItemClick = useCallback(
    (index) => {
      if (!slidesData.length) return; // Ensure that slidesData exists
      // Get active triplet index from active slide
      const activeTripletIndex = slidesData[activeIndex].tripletIndex;

      // Find triplet corresponding to clicked index using triplets provided by the hook
      const selectedTriplet = triplets.find((triplet) =>
        triplet.includes(index)
      );

      if (!isSliderMenuOpen || isIntroNeeded || !selectedTriplet) return;

      // Calculate distance between active index and every index inside triplets
      const distances = selectedTriplet.map((tripletIndex) =>
        Math.abs(tripletIndex - activeTripletIndex)
      );

      // Select nearest index
      const closestIndex =
        selectedTriplet[distances.indexOf(Math.min(...distances))];

      // Find index inside slidesData corresponding to closestIndex
      const newIndex = slidesData.findIndex(
        (slide) => slide.tripletIndex === closestIndex
      );

      if (newIndex !== -1) {
        // Update currentIndex subject to the distance between closestIndex and actove index
        setCurrentIndex((prev) => prev + (closestIndex - activeTripletIndex));
        setActiveSnapIndex(index); // Update active snap index
      }

      if (!isSnapItemClicked) {
        setIsSnapItemClicked(true);
      }
    },
    [
      slidesData,
      setCurrentIndex,
      activeIndex,
      isSliderMenuOpen,
      isIntroNeeded,
      isSnapItemClicked,
      triplets
    ]
  );

  const handleToggleClick = () => {
    if (!slidesData[activeIndex]) return;

    const newPath = `/realisations/${slidesData[activeIndex].path}`;

    if (pathname === newPath) {
      router.push('/realisations');
    } else {
      router.push(newPath);
    }
  };

  const slideToIndex = useCallback(
    (index) => {
      if (!index) return;
      setCurrentIndex((prev) => prev + (index - activeIndex));
    },
    [setCurrentIndex, activeIndex]
  );

  const handleTransition = useCallback(
    (type, index = null, path) => {
      switch (type) {
        case 'first_visit_realizations':
          openSliderMenu();
          break;
        case 'back_to_realizations':
          openSliderMenu();
          break;
        case 'enter_realization':
          closeSliderMenu();
          break;
        case 'directly_to_realization':
          closeSliderMenu();
          break;
        case 'switch_realization':
          slideToIndex(index);
          closeSliderMenu();
          break;
        case 'invalid_path_redirect':
          router.replace('/realisations');
          break;
        case 'navigating_to_realization':
          if (path) {
            router.push(`/realisations/${path}`);
            closeSliderMenu();
          }
          break;
        default:
          break;
      }
    },
    [openSliderMenu, closeSliderMenu, router, slideToIndex]
  );

  useTransitionRoutes({
    slug,
    slidesData,
    activeIndex,
    onTransition: handleTransition
  });

  useEffect(() => {
    const originalOverflowY = document.body.style.overflowY; // Save initial state
    document.body.style.overflowY = 'scroll';

    return () => {
      document.body.style.overflowY = originalOverflowY; // Restore initial state
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const updateWidth = () => {
      const newWidth = ultra || xxxl || xxl ? window.innerWidth / 4.25 : 320;
      setSlideWidth(newWidth);
    };

    updateWidth(); // Initial call to define width at first render
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, [isHydrated, ultra, xxxl, xxl]);

  useEffect(() => {
    if (!isHydrated) return;

    setMinSlides(desktop ? 5 : 3);
  }, [isHydrated, desktop]);

  useEffect(() => {
    isSliderMenuOpen ? showSlider() : showPreview();
  }, [isSliderMenuOpen, showPreview, showSlider]);

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
              key={slide.key}
              ref={(el) => (slidesRef.current[index] = el)}
              className={styles.slide}
            >
              <div
                className={styles.slide_bg}
                style={{
                  backgroundImage: `url(${mobile ? slide.cover.images[0] : slide.cover.images[1]})`
                }}
              ></div>
              <div className={styles.slide_overlay}>
                <div
                  className={clsx(
                    bricolage_grotesque.className,
                    styles.slide_title
                  )}
                  style={{
                    textShadow: `5px 5px 10px rgba(${slide.title.rgbShadow}, 0.6)`
                  }}
                >
                  {slide.title.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          ref={activeLabelRef}
          className={clsx(bricolage_grotesque.className, styles.active_label)}
        >
          {slidesData[activeIndex]?.title.text}
        </div>
      </div>

      {isSliderMenuOpen && !hasSwiped && !isSnapItemClicked && !hasScrolled && (
        <div className={styles.feature_info}>
          {isHydrated && !desktop && <SwipeIndicator />}
          {isHydrated && desktop && <SpinningBadge defaultText={false} />}
        </div>
      )}

      {mobile && (
        <div className={clsx(styles.menu_bar, isSliderMenuOpen && styles.show)}>
          {sm && (
            <div className={styles.scroll_snap}>
              {datas.map((item, index) => (
                <div
                  key={`snap-item-${index}`}
                  ref={(el) => (snapItemsRef.current[index] = el)}
                  className={clsx(
                    styles.snap_item,
                    index === activeSnapIndex && styles.active
                  )}
                  onClick={() => handleSnapItemClick(index)}
                >
                  <Image
                    src={item.thumbnail.img}
                    alt={item.thumbnail.alt}
                    fill
                    style={{objectFit: 'cover'}}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div ref={togglerRef} className={styles.toggler}>
        <ButtonToggle
          text={isSliderMenuOpen ? 'Découvrir' : 'Retour'}
          toggle={handleToggleClick}
        />
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
