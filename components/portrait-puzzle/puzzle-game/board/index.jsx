'use client';

import styles from '../style.module.scss';
import {useState, useEffect} from 'react';
import {TILE_COUNT, GRID_SIZE} from '../constants';
import {shuffle, canSwap, swap, isSolved} from '../helpers';
import Tile from '../tile';

/**
 * Composant Board
 * @param {string} imgUrl Image URL to be used for the tiles.
 * @param {number} sizeBasis Value necessary to determine the board size.
 * @param {function} setNoOpacity Function to be executed when 'hasWon' is true
 */
const Board = ({imgUrl, sizeBasis, onWin}) => {
  const [boardSize, setBoardSize] = useState(0);
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(
        tiles,
        tileIndex,
        tiles.indexOf(tiles.length - 1)
      );
      setTiles(swappedTiles);
    }
  };

  const handleTileClick = (index) => {
    if (!isStarted) {
      setIsStarted(true);
    }
    swapTiles(index);
  };

  const handleShuffleClick = () => {
    shuffleTiles();
  };

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  };

  // Initial tiles shuffle
  useEffect(() => {
    setIsStarted(false);
    shuffleTiles();
  }, []);

  // Update board size
  useEffect(() => {
    if (sizeBasis) {
      const size = sizeBasis * 0.75;
      setBoardSize(size);
    }
  }, [sizeBasis]);

  // Determine tile size
  const pieceWidth = Math.round(boardSize / GRID_SIZE);
  const pieceHeight = Math.round(boardSize / GRID_SIZE);
  const style = {
    width: boardSize,
    height: boardSize
  };

  useEffect(() => {
    if (isStarted && isSolved(tiles)) {
      setHasWon(true);
      onWin(true);
    }
  }, [isStarted, tiles, hasWon, onWin]);

  if (hasWon) {
    return null; // Hide the game board
  }

  return (
    <ul style={style} className={styles.puzzle_game_board}>
      {tiles.map((tile, index) => (
        <Tile
          key={tile}
          index={index}
          imgUrl={imgUrl}
          tile={tile}
          width={pieceWidth}
          height={pieceHeight}
          boardSize={boardSize}
          handleTileClick={handleTileClick}
        />
      ))}
    </ul>
  );
};

export default Board;
