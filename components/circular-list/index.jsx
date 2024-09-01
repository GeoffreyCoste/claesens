import styles from './style.module.scss';
import {useRef, useLayoutEffect} from 'react';
import {bricolage_grotesque} from '@/app/fonts';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import clsx from 'clsx';
import {STEPS} from './data';

const CircularList = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    let container;
    let wrapper;

    if (containerRef.current) {
      container = containerRef.current;
    }

    if (wrapperRef.current) {
      wrapper = wrapperRef.current;
    }

    gsap.registerPlugin(ScrollTrigger);

    const totalScroll = 700; // Total scroll distance (800vh)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${totalScroll + 100}vh`,
        scrub: true,
        pin: wrapper,
        pinSpacing: true
        // markers: true
      }
    });
  }, [containerRef, wrapperRef]);

  return (
    <div ref={containerRef} className={styles.circular_container}>
      <div /* ref={wrapperRef} */ className={styles.circular_wrapper}>
        <ul className={styles.circular_list}>
          {STEPS.map((step, index) => (
            <li
              key={`step-${index}`}
              className={styles.circular_list_item}
              style={{'--i': `${index + 1}`}}
            >
              <div className={styles.circular_list_item_content}>
                <article className={styles.step_article}>
                  <h2
                    className={clsx(
                      bricolage_grotesque.className,
                      styles.step_article_title
                    )}
                  >
                    {step.title}
                  </h2>
                  <p className={styles.step_article_description}>
                    {step.description}
                  </p>
                </article>
              </div>
            </li>
          ))}
          {/* <li className={styles.circular_list_item} style={{'--i': 1}}>
            <div className={styles.circular_list_item_content}>4</div>
          </li>
          <li className={styles.circular_list_item} style={{'--i': 2}}>
            <div className={styles.circular_list_item_content}>3</div>
          </li>
          <li className={styles.circular_list_item} style={{'--i': 3}}>
            <div className={styles.circular_list_item_content}>2</div>
          </li>
          <li className={styles.circular_list_item} style={{'--i': 4}}>
            <div className={styles.circular_list_item_content}>1</div>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default CircularList;

/* {STEPS.map((step, index) => (
  <article key={`step-${index}`} className={styles.circular_text_article}>
    <h2>{step.title}</h2>
    <p>{step.description}</p>
  </article>
))} */
