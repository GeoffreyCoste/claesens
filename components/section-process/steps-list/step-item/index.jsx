import styles from '../style.module.scss';

const StepItem = ({index, icon, label}) => {
  return (
    <li className={styles.steps_list_item}>
      <div className={styles.circle}>{icon}</div>
      <p className={styles.steps_list_item_index}>{index + 1}</p>
      <p className={styles.steps_list_item_label}>{label}</p>
    </li>
  );
};

export default StepItem;
