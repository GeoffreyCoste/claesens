import styles from './style.module.scss';
import {h1SectionServices} from '../animate-heading/data';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import Scene from '../3d/scene';

export default function SectionServicesIntro() {
  return (
    <section className={styles.section_services_intro}>
      <div className={styles.section_services_intro_content}>
        <div className={styles.section_services_intro_wrapper}>
          <div className={styles.section_services_intro_neumorphism}>
            <Scene />
          </div>
        </div>
        <div className={styles.section_services_intro_wrapper}>
          <AnimateStagger>
            {h1SectionServices.map((text, index) => (
              <AnimateHeading key={index} {...text} />
            ))}
            <AnimateFade>
              <div className={styles.section_services_intro_item}>
                <p className={styles.section_services_intro_text}>
                  Avec une expertise complète et une approche à 360 degrés du
                  design, je vous offre une gamme complète de services pour
                  répondre à tous vos besoins créatifs.
                </p>
                <p className={styles.section_services_intro_text}>
                  Que vous cherchiez à renforcer votre identité de marque, à
                  captiver vos utilisateurs en ligne, ou à donner vie à des
                  supports imprimés percutants, je vous accompagne à chaque
                  étape du processus.
                </p>
                <p className={styles.section_services_intro_text}>
                  Découvrez mes domaines de compétences et la manière dont ils
                  peuvent enrichir votre projet.
                </p>
              </div>
            </AnimateFade>
          </AnimateStagger>
        </div>
      </div>
    </section>
  );
}
