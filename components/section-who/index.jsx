import styles from './style.module.scss';
import Button from '../button';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import {h2SectionWho} from '../animate-heading/data';
import AnimateFade from '../animate-fade';
import PortraitPuzzle from '../portrait-puzzle';

const SectionWho = () => {
  return (
    <section className={styles.section_who}>
      <div className={styles.section_who_content}>
        <div className={styles.section_who_content_wrapper}>
          <AnimateStagger>
            {h2SectionWho.map((text, index) => (
              <AnimateHeading key={index} {...text} />
            ))}
            <AnimateFade>
              <p className={styles.section_who_content_text}>
                Je suis Emilie Claesens, graphiste passionnée issue des
                Beaux-Arts.
              </p>
              <p className={styles.section_who_content_text}>
                Je développe des solutions graphiques uniques et percutantes,
                adaptées à vos besoins.
              </p>
            </AnimateFade>
          </AnimateStagger>

          <Button pathname={'/'} title={'en savoir plus'} />
        </div>
      </div>
      <div className={styles.section_who_portrait}>
        <PortraitPuzzle />
      </div>
    </section>
  );
};

export default SectionWho;
