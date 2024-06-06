import styles from './style.module.scss';
import {useRef, useEffect} from 'react';
import {useInView} from 'framer-motion';
import PathMotion from './path-motion';
import {shapes1, shapes2, shapes3, shapes4, shapes5} from './paths';

const SvgMorph = () => {
  const svgRef = useRef(null);

  const isInView = useInView(svgRef, {once: true, amount: 0.8});

  useEffect(() => {
    console.log('Is in view: ', isInView);
  }, [isInView]);

  return (
    <div className={styles.svg_container}>
      <svg
        ref={svgRef}
        className={styles.svg_item}
        id="svg-morph"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 380 490" // To be updated
        preserveAspectRatio="xMinYMin meet" // Top left alignment with proportions maintained
      >
        <PathMotion
          paths={[shapes1, shapes2, shapes3, shapes4, shapes5]}
          isInView={isInView}
        />
      </svg>
    </div>
  );
};

export default SvgMorph;
