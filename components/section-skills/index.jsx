import styles from './style.module.scss';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/fonts';
import Button from '../button';
import GooeyCircles from '../gooey-circles';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import {h2SectionSkills} from '../animate-heading/data';
import AnimateFade from '../animate-fade';

const SectionSkills = () => {
  return (
    <section className={styles.section_skills}>
      <div className={styles.section_skills_body}>
        <div className={styles.section_skills_diagram}>
          <GooeyCircles />
        </div>
        <div className={styles.section_skills_content}>
          <div className={styles.section_skills_content_wrapper}>
            <AnimateStagger>
              {h2SectionSkills.map((text, index) => (
                <AnimateHeading key={index} {...text} />
              ))}
              <AnimateFade>
                <p className={styles.section_skills_content_text}>
                  Chaque projet est unique étant unique, je crée des solutions
                  personnalisées afin de répondre à vos besoins.
                </p>
                <p className={styles.section_skills_content_text}>
                  Que vous cherchiez à développer votre identité de marque, à
                  concevoir des supports imprimés, à améliorer votre présence en
                  ligne ou à animer vos vidéos, je vous aide à transformer votre
                  vision en réalité.
                </p>
              </AnimateFade>
            </AnimateStagger>
            <Button pathname={'services'} title={'en savoir plus'} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSkills;
