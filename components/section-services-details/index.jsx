import ScrollOverlap from '../scroll-overlap';
import styles from './style.module.scss';

const SectionServicesDetails = () => {
  return (
    <section className={styles.section_services_details}>
      <div className={styles.section_services_details_content}>
        <ScrollOverlap />
      </div>
    </section>
  );
};

export default SectionServicesDetails;
