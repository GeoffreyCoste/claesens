import styles from './style.module.scss';
import clsx from 'clsx';
import {Bricolage_Grotesque} from 'next/font/google';
import Button from '../button';

const bricolage_grotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin']
});

const SkillsSection = () => {
  return (
    <section className={styles.skills_section}>
      <div className={styles.skills_section_diagram}></div>
      <div className={styles.skills_section_content}>
        <h2
          className={clsx(
            bricolage_grotesque.variable,
            styles.skills_section_content_title
          )}
        >
          a vos côtés à chaque étape
        </h2>
        <Button pathname={'/'} title={'en savoir plus'} />
      </div>
    </section>
  );
};

export default SkillsSection;
