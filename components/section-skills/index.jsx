import styles from './style.module.scss';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/font';
import Button from '../button';
import GooeyCircles from '../gooey-circles';

const SectionSkills = () => {
  return (
    <section className={styles.section_skills}>
      <div className={styles.section_skills_diagram}>
        <GooeyCircles />
      </div>
      <div className={styles.section_skills_content}>
        <div className={styles.section_skills_content_wrapper}>
          <h2
            className={clsx(
              bricolage_grotesque.className,
              styles.section_skills_content_title
            )}
          >
            un service sur-mesure
          </h2>
          <Button pathname={'/'} title={'en savoir plus'} />
        </div>
      </div>
    </section>
  );
};

export default SectionSkills;
