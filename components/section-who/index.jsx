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
      <div className={styles.section_who_body}>
        <div className={styles.section_who_content}>
          <div className={styles.section_who_content_wrapper}>
            <AnimateStagger>
              {h2SectionWho.map((text, index) => (
                <AnimateHeading key={index} {...text} />
              ))}
              <AnimateFade>
                <p className={styles.section_who_content_text}>
                  Je suis Emilie Claesens, Creative Designer passionnée par les
                  Arts visuels et toujours à la recherche d&apos;innovations.
                </p>
                <p className={styles.section_who_content_text}>
                  Mon parcours artistique, débuté aux Beaux-Arts en Belgique et
                  enrichi par une spécialisation en graphisme en France,
                  m&apos;a doté d&apos;un regard unique.
                </p>
                <p className={styles.section_who_content_text}>
                  Après plus de 10 ans passés dans le e-commerce, je me consacre
                  aujourd&apos;hui à la création de solutions visuelles
                  percutantes.
                </p>
              </AnimateFade>
            </AnimateStagger>

            <Button pathname={'a_propos'} title={'en savoir plus'} />
          </div>
        </div>
        <div className={styles.section_who_portrait}>
          <PortraitPuzzle />
        </div>
      </div>
    </section>
  );
};

export default SectionWho;
