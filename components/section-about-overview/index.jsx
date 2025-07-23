'use client';

import styles from './style.module.scss';
import {useRef, useLayoutEffect} from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import clsx from 'clsx';
import Image from 'next/image';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {h2SectionAboutOverview} from '../animate-heading/data';
import {StickyBlocks} from './data';

gsap.registerPlugin(ScrollTrigger);

const SectionAboutOverview = () => {
  const blocksRef = useRef([]);

  const {mobile} = useMediaQueries();

  useLayoutEffect(() => {
    const blocks = blocksRef.current;

    if (!blocks) return;

    const ctx = gsap.context(() => {
      blocks.forEach((block, index) => {
        const isLast = index === blocks.length - 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top top',
            end: '+=100%',
            scrub: true
          }
        });

        tl.to(
          block,
          {
            ease: 'none',
            startAt: {filter: 'brightness(100%)'},
            filter: isLast ? 'none' : 'brightness(50%)',
            scale: 0.95,
            borderRadius: 10
          },
          0
        );

        const imageContainer = block.querySelector(
          `.${styles.wrapper_img} > img`
        );
        tl.to(
          imageContainer,
          {
            rotate: 10, // Rotation légère en degrés
            scale: 0.95,
            // opacity: 0.5,
            transformOrigin: 'center', // Centre de l'image pour la rotation
            ease: 'none'
          },
          0
        );
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.section_about_overview}>
      <div className={styles.section_about_overview_intro}>
        <AnimateStagger isTextCentered={mobile ? false : true}>
          {h2SectionAboutOverview.map((text, index) => (
            <AnimateHeading key={index} {...text} />
          ))}
          <AnimateFade>
            <div className={styles.section_about_overview_intro_item}>
              <p className={styles.section_about_overview_intro_text}>
                Illustration d&apos;une trajectoire créative en quelques
                chiffres.
              </p>
            </div>
          </AnimateFade>
        </AnimateStagger>
      </div>
      <div className={styles.section_about_overview_content}>
        {StickyBlocks.map((block, blockIndex) => {
          const {title, description, image} = block;
          return (
            <div
              key={`content-block-${blockIndex}`}
              className={clsx(
                styles.section_about_overview_content_block,
                styles.block
              )}
              ref={(el) => (blocksRef.current[blockIndex] = el)}
            >
              <div className={styles.block_inner}>
                <div className={styles.block_inner_item}>
                  <div
                    className={clsx(
                      styles.block_inner_item_wrapper,
                      styles.wrapper_img
                    )}
                  >
                    <Image
                      src={image.src}
                      fill
                      alt={image.alt}
                      style={{objectFit: 'cover'}}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className={styles.block_inner_item}>
                  <div
                    className={clsx(
                      styles.block_inner_item_wrapper,
                      styles.wrapper_content
                    )}
                  >
                    <h3
                      className={styles.wrapper_content_title}
                      aria-label={`${title.number} ans ${title.text}`}
                    >
                      <span className={styles.wrapper_content_title_number}>
                        {title.number}
                      </span>
                      <span className={styles.wrapper_content_title_text}>
                        ans
                        <strong>{title.text}</strong>
                      </span>
                    </h3>
                    {description.map((item, itemIndex) =>
                      Array.isArray(item) ? (
                        <ul
                          key={`description-list-${blockIndex}-${itemIndex}`}
                          className={styles.wrapper_content_list}
                        >
                          {item.map((listItem, listItemIndex) => (
                            <li
                              key={`list-item-${blockIndex}-${itemIndex}-${listItemIndex}`}
                              className={styles.wrapper_content_list_item}
                            >
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p
                          key={`description-text-${itemIndex}`}
                          className={styles.wrapper_content_text}
                        >
                          {item}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SectionAboutOverview;
