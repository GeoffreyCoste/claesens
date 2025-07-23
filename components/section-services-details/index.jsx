import styles from './style.module.scss';
import AnimateFade from '../animate-fade';
import AnimateHeading from '../animate-heading';
import AnimateStagger from '../animate-stagger';
import ScrollOverlap from '../scroll-overlap';
import {h2SectionServicesDetails} from '../animate-heading/data';

const SectionServicesDetails = () => {
  return (
    <section className={styles.section_services_details}>
      <div className={styles.section_services_details_content}>
        <div className={styles.heading}>
          <AnimateStagger isTextCentered={true}>
            {h2SectionServicesDetails.map((text, index) => (
              <AnimateHeading key={index} {...text} />
            ))}
            <AnimateFade>
              <p className={styles.content_text}>
                Une palette créative pour enrichir, dynamiser et faire rebondir
                votre communication.
              </p>
            </AnimateFade>
          </AnimateStagger>
        </div>

        <ScrollOverlap />
      </div>
    </section>
  );
};

export default SectionServicesDetails;
