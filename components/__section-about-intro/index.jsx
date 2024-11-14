import styles from './style.module.scss';
import Image from 'next/image';
import {h1SectionAbout} from '../animate-heading/data';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';

export default function SectionAboutIntro() {
  return (
    <section className={styles.section_about_intro}>
      <div className={styles.section_about_intro_content}>
        <div className={styles.section_about_intro_wrapper}>
          <AnimateStagger>
            {h1SectionAbout.map((text, index) => (
              <AnimateHeading key={index} {...text} />
            ))}
            <AnimateFade>
              <div className={styles.section_about_intro_item}>
                <p className={styles.section_about_intro_text}>
                  Je suis une Creative Designer passionnée par le design visuel
                  et l&apos;innovation.
                </p>
                <p className={styles.section_about_intro_text}>
                  Mon parcours aux Beaux-Arts en Belgique, suivi d&apos;une
                  spécialisation en graphisme en France, m&apos;a permis de
                  cultiver un oeil créatif et une approche unique pour donner
                  vie à des idées visuelles.
                </p>
              </div>
            </AnimateFade>
          </AnimateStagger>
        </div>
        <div className={styles.section_about_intro_wrapper}>
          <div className={styles.yellow_circle}></div>
          <div className={styles.section_about_intro_img}></div>
        </div>
      </div>
    </section>
  );
}
