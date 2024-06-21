import styles from './style.module.scss';
import Button from '../button';
import StepsList from './steps-list';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import {h2SectionProcess} from '../animate-heading/data';
import AnimateFade from '../animate-fade';

const SectionProcess = () => {
  return (
    <section className={styles.section_process}>
      <div className={styles.section_process_content}>
        <AnimateStagger isTextCentered={true}>
          {h2SectionProcess.map((text, index) => (
            <AnimateHeading key={index} {...text} />
          ))}
          <AnimateFade>
            <p className={styles.section_process_content_text}>
              Afin de garantir une collaboration transparente et efficace à
              chaque étape de votre projet.
            </p>
          </AnimateFade>
        </AnimateStagger>
        <div className={styles.section_process_item}>
          <StepsList />
        </div>
        <Button pathname={'/'} title={'en savoir plus'} />
      </div>
    </section>
  );
};

export default SectionProcess;
