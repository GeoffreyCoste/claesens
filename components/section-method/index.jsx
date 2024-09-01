import styles from './style.module.scss';
import {h1SectionMethod} from '../animate-heading/data';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import CanvasMethod from '../canvas-method';
import CircularList from '../circular-list';
import ScrollTriggerWrapper from './scroll-trigger-wrapper';

/* import SVGVideoClip from '../svg-video-clip'; */
import PinContainer from './pin-container';

export default function SectionMethod() {
  return (
    <section className={styles.section_method}>
      <div className={styles.section_method_content}>
        <div className={styles.section_method_wrapper}>
          <AnimateStagger>
            {h1SectionMethod.map((text, index) => (
              <AnimateHeading key={index} {...text} />
            ))}
            <AnimateFade>
              <div className={styles.section_method_item}>
                <p className={styles.section_method_text}>
                  Mon processus de travail est rigoureusement structuré pour
                  garantir une collaboration fluide et efficace à chaque étape
                  de votre projet, du brief initial à la livraison finale.
                </p>
              </div>
            </AnimateFade>
          </AnimateStagger>
        </div>
        <div className={styles.section_method_wrapper}>
          <PinContainer />
          {/* <SVGVideoClip
            videoSource={'/videos/5384976-uhd_4096_2160_30fps.mp4'}
          /> */}

          <ScrollTriggerWrapper />

          {/* <div style={{width: '100%', height: 'auto', position: 'relative'}}>
            <CanvasMethod />
            {/* <CircularList /> *}
          </div> */}
        </div>
      </div>
    </section>
  );
}
