import styles from './style.module.scss';
import clsx from 'clsx';
import {Bricolage_Grotesque} from 'next/font/google';
import Button from '../button';
import StepsList from './steps-list';

const bricolage_grotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin']
});

const ProcessSection = () => {
  return (
    <section className={styles.process_section}>
      <div className={styles.process_section_content}>
        <h2
          className={clsx(
            bricolage_grotesque.variable,
            styles.process_section_content_title
          )}
        >
          Un processus structuré.
        </h2>
        <p className={styles.process_section_content_text}>
          Afin de garantir une collaboration transparente et efficace à chaque
          étape de votre projet.
        </p>
        <div className={styles.process_section_item}>
          <StepsList />
        </div>
        <Button pathname={'/'} title={'en savoir plus'} />
      </div>
    </section>
  );
};

export default ProcessSection;
