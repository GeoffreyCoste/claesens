import styles from './style.module.scss';
import clsx from 'clsx';

const Badge = ({
  text,
  dot = false,
  color = 'gray_light',
  fontSize = 'base',
  fontWeight = 'bold',
  padding = 'default',
  bg = 'transparent',
  border = 'gray_light',
  isGlass = false
}) => {
  return (
    <>
      {!isGlass ? (
        <span
          className={clsx(
            styles.badge,
            styles[`color_${color}`],
            styles[`size_${fontSize}`],
            styles[`weight_${fontWeight}`],
            styles[`padding_${padding}`],
            styles[`bg_${bg}`],
            styles[`border_${border}`]
          )}
        >
          {dot && '●'} {text}
        </span>
      ) : (
        <div className={clsx(styles.badge, styles.badge_glass)}>
          <div className={styles.content}>
            <span className={styles.text}>
              {dot && '●'} {text}
            </span>
          </div>
          <div className={styles.shadow}></div>
        </div>
      )}
    </>
  );
};

export default Badge;