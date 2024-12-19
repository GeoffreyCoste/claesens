'use client';

import {useState, useEffect, forwardRef} from 'react';
import clsx from 'clsx';
import styles from '../style.module.scss';

const MenuButton = forwardRef(function MenuButton({title, icon, action}, ref) {
  const [copied, setCopied] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    console.log(action);
    switch (action) {
      case 'copy':
        // Manage clipboard copy
        navigator.clipboard
          .writeText('hello@claesens.fr')
          .then(() => {
            setCopied(true);
            setAnimate(true); // Start button animation
            setTimeout(() => {
              setCopied(false);
              setAnimate(false); // Reinitialize after 2 seconds
            }, 2000);
          })
          .catch((err) => console.error('Échec de la copie: ', err));
        break;

      case 'email':
        const email = 'hello@claesens.fr';
        const subject = 'Contact';
        // Open client email without changing browsing history
        window.open(`mailto:${email}?subject=${subject}`, '_self');
        break;

      default:
        console.log('Action non définie');
    }
  };

  return (
    <button
      ref={ref}
      className={clsx(styles.button, styles.menu_button, {
        [styles.animate]: animate
      })}
      onClick={handleClick}
    >
      <div className={styles.button_icon}>{icon}</div>
      <p className={styles.button_title}>{title}</p>
    </button>
  );
});

export default MenuButton;
