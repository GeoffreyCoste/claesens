import styles from './style.module.scss';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/font';
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
            <p className={styles.section_hero_item_text}>
              emilie claesens <br />
              creative designer freelance
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
              Be
              <span
                className={clsx(
                  bricolage_grotesque.className,
                  styles.text_outline
                )}
              >
                lgian
              </span>
              <br />
              <span
                className={clsx(
                  bricolage_grotesque.className,
                  styles.text_outline
                )}
              >
                &&nbsp;
              </span>
              creative
            </h1>
          </div>
          <div className={styles.section_hero_item}>
            <p
              className={clsx(
                styles.section_hero_item_text,
                styles.text_align_right
              )}
            >
              passionnée par la conception numérique, <br />
              je vous accompagne en développant des projets à votre image
            </p>
          </div>
        </div>
        <div className={styles.section_hero_secondary}>
          <div className={styles.section_hero_item_badge}>
            <SpinningBadge />
          </div>
          <div className={styles.section_hero_secondary_container}>
            <div className={styles.section_hero_item_text}>
              <p
                className={clsx(
                  bricolage_grotesque.className,
                  styles.section_hero_item_location
                )}
              >
                Paris, France
              </p>
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
