import styles from './style.module.scss';
import socials from './data';

const SocialsList = () => {
  return (
    <ul className={styles.socials_list}>
      {socials.map((link, index) => (
        <li key={`0${index}-${link.name}`} className={styles.socials_list_item}>
          <a
            href={link.path}
            className={styles.socials_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span data-hover={link.name}>{link.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialsList;
