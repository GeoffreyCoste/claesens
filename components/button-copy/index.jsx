'use client';

import styles from './style.module.scss';
import {useState} from 'react';
import clsx from 'clsx';

const ButtonCopy = ({
  copy = 'hello@claesens.fr',
  title = 'hello@claesens.fr',
  btnLarge = false
}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = (e) => {
    e.target.blur();
    navigator.clipboard
      .writeText(copy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('An error occured while copying: ', error);
      });
  };

  return (
    <div className={styles.button_wrapper}>
      <button
        className={clsx(styles.button, styles.button_yellow, {
          [styles.button_large]: btnLarge
        })}
        onClick={(e) => handleClick(e)}
      >
        <div className={styles.button_round}></div>
        <p className={styles.button_title}>{title}</p>
        <div className={styles.button_arrow}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM0 9H15V7H0V9Z"
              fill={'#fce300'}
            ></path>
          </svg>
        </div>
      </button>
      {copied && <div className={styles.button_toast}>Email copié !</div>}
    </div>
  );
};

export default ButtonCopy;
