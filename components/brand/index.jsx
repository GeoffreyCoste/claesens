import styles from "./style.module.scss";

export default function Brand() {

  return (
    <div className={styles.brand}>
      <div className={styles.brand_name}>
        <span>clae</span>
        <span>sens</span>
      </div>
      <span className={styles.dot}></span>
    </div>
  );
}
