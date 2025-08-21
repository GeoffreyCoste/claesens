import styles from './style.module.scss';
import {dm_sans} from '@/app/fonts';
import clsx from 'clsx';
import Image from 'next/image';
import CanvasDots from './canvas-dots';
import Badge from '../badge';

const labels = [
  new Date().getFullYear().toString(),
  'freelance',
  'design',
  'vision',
  'créativité',
  'émotions'
];

const SectionAboutHero = () => {
  return (
    <section className={styles.section_about_hero}>
      <div className={styles.section_about_hero_background}>
        <CanvasDots />
      </div>
      <div className={styles.section_about_hero_content}>
        <div className={styles.content_wrapper}>
          <div className={styles.content_img}>
            <Image
              src="/images/img_about_hero_640x640.jpg"
              alt="Emilie Claesens creative designer freelance - photo noir et blanc avec sphères blanches lumineuses remontant le long de son bras droit"
              fill
              priority
              style={{objectFit: 'cover'}}
            />
          </div>

          <div className={styles.content_lists}>
            <ul className={styles.list}>
              {labels.slice(0, 3).map((label, index) => (
                <li
                  key={`about-hero-label-1-${index}`}
                  className={styles.list_item}
                  style={{'--i': index + 1}}
                >
                  <Badge
                    text={label}
                    dot
                    isGlass
                    // color="black"
                    // bg="gray"
                    // border="black"
                  />
                </li>
              ))}
            </ul>
            <ul className={styles.list}>
              {labels.slice(3).map((label, index) => (
                <li
                  key={`about-hero-label-2-${index}`}
                  className={styles.list_item}
                  style={{'--i': index + 4}}
                >
                  <Badge
                    text={label}
                    dot
                    isGlass
                    // color="black"
                    // bg="gray"
                    // border="black"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <div className={styles.content_img}>
          <div className={styles.img_wrapper}>
            <Image
              src="/images/img_about_hero_640x640.jpg"
              alt="Emilie Claesens creative designer freelance - photo noir et blanc avec sphères blanches lumineuses remontant le long de son bras droit"
              fill
              priority
              style={{objectFit: 'cover'}}
            />
          </div>
        </div> */}
        <div className={styles.content_title}>
          <h1
            className={clsx(dm_sans.className, styles.title)}
            aria-label="Emilie Claesens"
          >
            <span>émilie</span>
            <span>claesens</span>
          </h1>
        </div>
        {/* <div className={styles.content_lists}>
          <ul className={styles.list}>
            {labels.slice(0, 3).map((label, index) => (
              <li
                key={`about-hero-label-1-${index}`}
                className={styles.list_item}
                style={{'--i': index + 1}}
              >
                <Badge text={label} dot black />
              </li>
            ))}
          </ul>
          <ul className={styles.list}>
            {labels.slice(3).map((label, index) => (
              <li
                key={`about-hero-label-2-${index}`}
                className={styles.list_item}
                style={{'--i': index + 4}}
              >
                <Badge text={label} dot black />
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </section>
  );
};

export default SectionAboutHero;
