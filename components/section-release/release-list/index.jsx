import styles from './style.module.scss';
import {useState} from 'react';
import ReleaseItem from './release-item';

const ReleaseList = (props) => {
  const [expanded, setExpanded] = useState(0);

  const {items} = props;

  return (
    <ul className={styles.release_list}>
      {items.map((item, i) => (
        <ReleaseItem
          key={i}
          index={i}
          {...item}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </ul>
  );
};

export default ReleaseList;
