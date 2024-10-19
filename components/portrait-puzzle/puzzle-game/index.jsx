'use client';

import styles from './style.module.scss';
import Board from './board';

/**
 * Composant SlidingPuzzle
 * @param {number} sizeBasis Value used to determine the puzzle size (i.e. 75% of this value).
 * @param {function} onWin Function to be executed on win.
 */
const SlidingPuzzle = ({sizeBasis, onWin}) => {
  // sizeBasis validation
  if (typeof sizeBasis !== 'number' || sizeBasis < 0) {
    console.error('sizeBasis prop should be a positive number.');
    return null;
  }

  return (
    <div className={styles.puzzle_game_container}>
      <Board
        imgUrl={'/images/img_puzzle.jpg'}
        sizeBasis={sizeBasis}
        onWin={onWin}
      />
    </div>
  );
};

export default SlidingPuzzle;
