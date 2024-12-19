import styles from './style.module.scss';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/fonts';
import Button from '../button';
import GooeyCircles from '../gooey-circles';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import {h2SectionSkills} from '../animate-heading/data';

const SectionSkills = () => {
  return (
    <section className={styles.section_skills}>
      <div className={styles.section_skills_diagram}>
        <GooeyCircles />
      </div>
      <div className={styles.section_skills_content}>
        <div className={styles.section_skills_content_wrapper}>
          <AnimateStagger>
            {h2SectionSkills.map((text, index) => (
              <AnimateHeading key={index} {...text} />
            ))}
          </AnimateStagger>
          <Button pathname={'/'} title={'en savoir plus'} />
        </div>
      </div>
    </section>
  );
};

export default SectionSkills;
