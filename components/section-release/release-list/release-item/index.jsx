import styles from '../style.module.scss';
import Link from 'next/link';
import FlipCard from '@/components/flip-card';

const ReleaseItem = (props) => {
  const {pathname, ...rest} = props;
  return (
    <li className={styles.release_list_item}>
      <Link href={pathname}>
        <FlipCard {...rest} />
      </Link>
    </li>
  );
};

export default ReleaseItem;
