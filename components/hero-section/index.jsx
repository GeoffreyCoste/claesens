import styles from './style.module.scss';
import clsx from 'clsx';
import {Bricolage_Grotesque} from 'next/font/google';
import Sphere3D from '../sphere3D';
import SpinningBadge from '../spinning-badge';
import SocialsList from '../socials-list';

const bricolage_grotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin']
});

export default function HeroSection() {
  return (
    <section className={styles.hero_section}>
      <div className={styles.hero_section_canvas}>
        <Sphere3D />
      </div>
      <div className={styles.hero_section_content}>
        <div className={styles.hero_section_main}>
          <div className={styles.hero_section_item}>
            <p className={styles.hero_section_item_text}>
              emilie claesens <br />
              creative designer freelance
            </p>
          </div>
          <div
            className={clsx(
              styles.hero_section_item,
              styles.hero_section_item_align_center
            )}
          >
            <h1
              className={clsx(
                bricolage_grotesque.variable,
                styles.hero_section_item_title
              )}
              aria-label="Belgian & creative"
            >
              Be
              <span
                className={clsx(
                  bricolage_grotesque.variable,
                  styles.text_outline
                )}
              >
                lgian
              </span>
              <br />
              <span
                className={clsx(
                  bricolage_grotesque.variable,
                  styles.text_outline
                )}
              >
                &&nbsp;
              </span>
              creative
            </h1>
          </div>
          <div className={styles.hero_section_item}>
            <p
              className={clsx(
                styles.hero_section_item_text,
                styles.text_align_right
              )}
            >
              passionnée par la conception numérique, <br />
              je vous accompagne en développant des projets à votre image
            </p>
          </div>
        </div>
        <div className={styles.hero_section_secondary}>
          <div className={styles.hero_section_item_badge}>
            <SpinningBadge />
          </div>
          <div className={styles.hero_section_secondary_container}>
            <div className={styles.hero_section_item_text}>
              <p
                className={clsx(
                  bricolage_grotesque.variable,
                  styles.hero_section_item_location
                )}
              >
                Paris, France
              </p>
            </div>
            <div className={styles.hero_section_item_list}>
              <SocialsList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
