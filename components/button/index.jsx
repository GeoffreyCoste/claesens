'use client';

import styles from './style.module.scss';
import Link from 'next/link';

const Button = ({pathname, title}) => {
  return (
    <Link className={styles.button} href={`/${pathname}`}>
      <div className={styles.button_round}></div>
      <p className={styles.button_title}>{title}</p>
      <div className={styles.button_arrow}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM0 9H15V7H0V9Z"
            fill="#fce300"
          ></path>
        </svg>
      </div>
    </Link>
  );
};

export default Button;
