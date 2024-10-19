import styles from '../style.module.scss';
import clsx from 'clsx';
import {motion} from 'framer-motion';
import {getMatrixPosition, getVisualPosition} from '../helpers';
import {TILE_COUNT, GRID_SIZE} from '../constants';

const Tile = ({
  tile,
  index,
  width,
  height,
  boardSize,
  handleTileClick,
  imgUrl
}) => {
  const {row, col} = getMatrixPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);
  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${boardSize}px`,
    backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * Math.floor(tile / GRID_SIZE)}%`
  };

  const motionStyle = {
    x: visualPos.x,
    y: visualPos.y
  };

  const tileClasses = clsx(styles.puzzle_game_tile, {
    [styles.not_visible]: tile === TILE_COUNT - 1 // Add 'not_visible' class to tile with opacity set to 0
  });

  return (
    <motion.li
      style={{
        ...tileStyle,
        opacity: tile === TILE_COUNT - 1 ? 0 : 1
      }}
      className={tileClasses}
      onClick={() => handleTileClick(index)}
      animate={{x: visualPos.x, y: visualPos.y}}
      transition={{type: 'spring', stiffness: 300, damping: 30}}
    >
      {!imgUrl && `${tile + 1}`}
    </motion.li>
  );
};

export default Tile;
