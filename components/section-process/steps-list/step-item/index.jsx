import styles from '../style.module.scss';
import Image from 'next/image';

const StepItem = ({index, img, label}) => {
  return (
    <li className={styles.steps_list_item}>
      <div className={styles.steps_list_item_img}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          loading="lazy"
          style={{objectFit: 'cover'}}
        />
      </div>
      <p className={styles.steps_list_item_index}>{index + 1}</p>
      <p className={styles.steps_list_item_label}>{label}</p>
    </li>
  );
};

export default StepItem;
