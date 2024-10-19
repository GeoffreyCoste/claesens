import styles from './style.module.scss';
import {h1SectionMethod} from '../animate-heading/data';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import SVGVideoClip from '../svg-video-clip';

export default function SectionMethodIntro() {
  return (
    <section className={styles.section_method_intro}>
      <div className={styles.section_method_intro_content}>
        <div className={styles.section_method_intro_wrapper}>
          <SVGVideoClip videoSource={'/videos/work_in_progress.mp4'} />
        </div>
        <div className={styles.section_method_intro_wrapper}>
          <AnimateStagger>
            {h1SectionMethod.map((text, index) => (
              <AnimateHeading key={index} {...text} />
            ))}
            <AnimateFade>
              <div className={styles.section_method_intro_item}>
                <p className={styles.section_method_intro_text}>
                  Mon processus de travail est rigoureusement structuré pour
                  garantir une collaboration fluide et efficace à chaque étape
                  de votre projet, du brief initial à la livraison finale.
                </p>
              </div>
            </AnimateFade>
          </AnimateStagger>
        </div>
      </div>
    </section>
  );
}
