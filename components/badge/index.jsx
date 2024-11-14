import styles from './style.module.scss';
import clsx from 'clsx';

const Badge = ({text, dot = false, black = false}) => {
  return (
    <span
      className={clsx(styles.badge, {
        [styles.black]: black
      })}
    >
      {dot && '●'} {text}
    </span>
  );
};

export default Badge;
