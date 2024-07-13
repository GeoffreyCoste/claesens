import styles from './style.module.scss';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/fonts';
import Badge from '../badge';
import ArrowRight from '../icons/arrow-right';

const FlipCard = ({index, name, badges, image}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_inner}>
        <div className={styles.card_front}>
          <div className={styles.card_content}>
            <div className={styles.card_header}>
              <div className={styles.card_header_item}>
                <p>{`projet #${index + 1}`}</p>
              </div>
              <div
                className={clsx(
                  bricolage_grotesque.className,
                  styles.card_header_title
                )}
              >
                {name}
              </div>
            </div>
            <div className={styles.card_menu}>
              <ul className={styles.card_menu_list}>
                {badges?.map((badge, i) => (
                  <li key={i} className={styles.menu_list_item}>
                    <Badge text={badge} />
                  </li>
                ))}
              </ul>
              <div className={styles.card_menu_item}>
                <ArrowRight color={'#fce300'} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.card_back}>
          <div className={styles.card_content}>
            <div className={styles.card_header}>
              <div className={styles.card_header_item}>
                <p>{`projet #${index + 1}`}</p>
              </div>
              <div
                className={clsx(
                  bricolage_grotesque.className,
                  styles.card_header_title
                )}
              >
                {name}
              </div>
            </div>
            <div className={styles.card_menu}>
              <ul className={styles.card_menu_list}>
                {badges?.map((badge, i) => (
                  <li key={i} className={styles.menu_list_item}>
                    <Badge text={badge} />
                  </li>
                ))}
              </ul>
              <div className={styles.card_menu_item}>
                <ArrowRight color={'#fce300'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
