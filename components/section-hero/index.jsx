'use client';

import styles from './style.module.scss';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/fonts';
import Sphere3D from '../sphere3D';
import SpinningBadge from '../spinning-badge';
import SocialsList from '../socials-list';

export default function SectionHero() {
  return (
    <section className={styles.section_hero}>
      <div className={styles.section_hero_canvas}>
        <Sphere3D />
      </div>
      <div className={styles.section_hero_content}>
        <div className={styles.section_hero_main}>
          <div className={styles.section_hero_item}>
            <p
              className={styles.section_hero_item_text}
              aria-label="Emilie Claesens, creative designer freelance."
            >
              <span>emilie claesens</span>
              <span>creative designer freelance</span>
            </p>
          </div>
          <div
            className={clsx(
              styles.section_hero_item,
              styles.section_hero_item_align_center
            )}
          >
            <h1
              className={clsx(
                bricolage_grotesque.className,
                styles.section_hero_item_title
              )}
              aria-label="Belgian & creative"
            >
              <strong>Be</strong>lgian
              <br />
              <strong>creative</strong>
            </h1>
          </div>
          <div className={styles.section_hero_item}>
            <p
              className={clsx(
                styles.section_hero_item_text,
                styles.text_align_right
              )}
              aria-label="Passionnée par la conception numérique, je vous accompagne en développant des projets à votre image."
            >
              <span>passionnée par la conception numérique,</span>
              <span>je vous accompagne en développant</span>
              <span>des projets à votre image</span>
            </p>
          </div>
        </div>
        <div className={styles.section_hero_secondary}>
          <div className={styles.section_hero_item_badge}>
            <SpinningBadge />
          </div>
          <div className={styles.section_hero_secondary_container}>
            <div className={styles.section_hero_item_text}>
              <span
                className={clsx(
                  bricolage_grotesque.className,
                  styles.section_hero_item_location
                )}
              >
                <strong>Paris,</strong> France
              </span>
            </div>
            <div className={styles.section_hero_item_list}>
              <SocialsList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
