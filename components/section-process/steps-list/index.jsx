import styles from './style.module.scss';
import steps from './data';
import StepItem from './step-item';

const StepsList = () => {
  return (
    <ul className={styles.steps_list}>
      {steps.map((step, i) => (
        <StepItem key={i} index={i} {...step} />
      ))}
    </ul>
  );
};

export default StepsList;
