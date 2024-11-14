import styles from './style.module.scss';
import {Fragment} from 'react';
import Image from 'next/image';
import {logos} from './data';

const LogosAside = () => {
  return (
    <aside className={styles.logos_aside}>
      <ul className={styles.logos_list}>
        {logos.map((logo, index) => (
          <Fragment key={`fragment-logo-${index}`}>
            <li className={styles.logos_item}>
              <Image
                src={logo.src}
                fill
                alt={logo.alt}
                style={{
                  objectFit: 'cover'
                }}
              />
            </li>
            {index !== logos.length - 1 && (
              <span className={styles.logos_separator}></span>
            )}
          </Fragment>
        ))}
      </ul>
    </aside>
  );
};

export default LogosAside;
