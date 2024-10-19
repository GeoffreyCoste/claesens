import styles from './style.module.scss';
import {counters} from './data';
import Counter from '../counter';

const CountersAside = () => {
  return (
    <aside className={styles.counters_aside}>
      <ul className={styles.counters_list}>
        {counters.map((counter, index) => (
          <>
            <li key={`counter-${index}`} className={styles.counters_item}>
              <Counter value={counter.value} direction="up" />
              <span className={styles.counters_label}>{counter.label}</span>
            </li>
            {index !== counters.length - 1 && (
              <span className={styles.counters_dot}></span>
            )}
          </>
        ))}
      </ul>
    </aside>
  );
};

export default CountersAside;
