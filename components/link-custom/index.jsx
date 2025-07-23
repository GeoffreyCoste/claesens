'use client';

import styles from './style.module.scss';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import useSliderMenu from '@/hooks/useSliderMenu';

const LinkCustom = ({href, text = '', outline = false, prev = false, next = false, mobile = false}) => {

  const {openSliderMenu} = useSliderMenu();

  const router = useRouter();

  const handleClick = () => {
    openSliderMenu();
    router.push(`${href}`);
  };

  return (
    <button
      className={clsx(
        styles.btn,
        {[styles.btn_prev] : prev && !next},
        {[styles.btn_next] : next && !prev},
        {[styles.btn_prev_mobile] : prev && !next && mobile},
        {[styles.btn_next_mobile] : next && !prev && mobile},
        {[styles.btn_yellow] : !prev && !next && !outline},
        {[styles.btn_outline_yellow] : !prev && !next && outline},
      )}
      onClick={handleClick}
    >
      {!prev && !next && <div className={styles.dot}></div>}
      {prev && <span className={styles.label}>{mobile ? 'Préc.' : 'Précédente'}</span>}
      {next && <span className={styles.label}>{mobile ? 'Suiv.' : 'Suivante'}</span>}
      {!prev && !next && <p className={styles.text}>{text}</p>}

      <div className={styles.arrow}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM0 9H15V7H0V9Z"
            fill={prev || next || outline ? '#1e1e1e' : '#fce300'}
          ></path>
        </svg>
      </div>
    </button>
  );
};

export default LinkCustom;
