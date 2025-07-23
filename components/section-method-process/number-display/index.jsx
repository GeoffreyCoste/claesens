'use client';

import styles from './style.module.scss';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import {emptyPattern, digitPatterns} from './data';

const NumberDisplay = ({index}) => {
  const [currentPattern, setCurrentPattern] = useState(
    digitPatterns[index] || emptyPattern
  );

  /* useEffect(() => {
    const newPattern = index !== null ? digitPatterns[index] : emptyPattern;

    setCurrentPattern((prevPattern) =>
      prevPattern.map((row, i) =>
        row.map((point, j) => ({
          visible: point.visible,
          fadeOut: point.visible && !newPattern[i][j],
          fadeIn: !point.visible && newPattern[i][j]
        }))
      )
    );

    const timer = setTimeout(() => {
      setCurrentPattern(newPattern);
    }, 500);

    return () => clearTimeout(timer);
  }, [index]); */

  useEffect(() => {
    if (index === null) {
      setCurrentPattern(emptyPattern);
      return;
    }

    const newPattern = digitPatterns[index];

    setCurrentPattern((prevPattern) =>
      prevPattern.map((row, i) =>
        row.map((point, j) => {
          const isVisibleNow = point.visible;
          const shouldBeVisible = newPattern[i][j];

          return {
            visible: isVisibleNow,
            fadeOut: isVisibleNow && !shouldBeVisible,
            fadeIn: !isVisibleNow && shouldBeVisible
          };
        })
      )
    );

    const timer = setTimeout(() => {
      setCurrentPattern(
        newPattern.map((row) =>
          row.map((visible) => ({visible, fadeOut: false, fadeIn: false}))
        )
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={styles.number_display}>
      {currentPattern.map((row, i) => (
        <div key={`row-${i}`} className={styles.number_display_row}>
          {row.map((point, j) => (
            <div
              key={j}
              className={clsx(
                styles.number_display_point,
                point.visible && styles.visible,
                point.fadeOut && styles.fadeOut,
                point.fadeIn && styles.fadeIn
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NumberDisplay;
