import styles from './style.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import {Bricolage_Grotesque} from 'next/font/google';
import Button from '../button';

const bricolage_grotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin']
});

const WhoSection = () => {
  return (
    <section className={styles.who_section}>
      <div className={styles.who_section_content}>
        <h2
          className={clsx(
            bricolage_grotesque.variable,
            styles.who_section_content_title
          )}
        >
          en bref.
        </h2>
        <p className={styles.who_section_content_text}>
          Je suis Emilie Claesens, graphiste passionnée issue des Beaux-Arts.
        </p>
        <p className={styles.who_section_content_text}>
          Je développe des solutions graphiques uniques et percutantes, adaptées
          à vos besoins.
        </p>
        <Button pathname={'/'} title={'en savoir plus'} />
      </div>
      <div className={styles.who_section_puzzle}>
        <Image
          className={styles.who_section_puzzle_img}
          width={288}
          height={369}
          src="/images/portrait.png"
          alt="Emilie Claesens"
        />
      </div>
    </section>
  );
};

export default WhoSection;
