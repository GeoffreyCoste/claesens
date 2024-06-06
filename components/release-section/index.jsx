import styles from './style.module.scss';
import clsx from 'clsx';
import {Bricolage_Grotesque} from 'next/font/google';
import Button from '../button';
import ReleaseList from './release-list';
import releases from './release-list/data';

const bricolage_grotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin']
});

const ReleaseSection = () => {
  return (
    <section className={styles.release_section}>
      <div className={styles.release_section_content}>
        <h2
          className={clsx(
            bricolage_grotesque.variable,
            styles.release_section_content_title
          )}
        >
          Réalisations.
        </h2>
        <ReleaseList items={releases} />
        <Button pathname={'/'} title={'tout voir'} outline />
      </div>
    </section>
  );
};

export default ReleaseSection;
