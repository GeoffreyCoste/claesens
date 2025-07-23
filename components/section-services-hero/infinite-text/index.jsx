import styles from './style.module.scss';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/fonts';

const InfiniteText = () => {
  return (
    <div className={styles.text_container}>
        {Array.from({ length: 2 }, (_, index) => (
          <div className={styles.text_block} key={`infinite-text-block-${index}`}>
            <div className={styles.content}>
              <span className={clsx(styles.text, bricolage_grotesque.className)}>
                univers &bull; univers &bull;
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default InfiniteText;