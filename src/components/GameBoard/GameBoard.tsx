import { useState, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";

import { getRandomImages } from "../../utils/imageLoader";
import "./GameBoard.scss";
import Tile from "../Tile/Tile";

interface TileData {
  id: number;
  image: string;
  isRevealed: boolean;
  isMatched: boolean;
}

const GameBoard = ({
  difficulty,
}: {
  difficulty: "easy" | "medium" | "hard";
}) => {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [revealedTiles, setRevealedTiles] = useState<TileData[]>([]);
  const {
    setAttempts,
    startGame,
    finishGame,
    resetGame,
    isGameFinished,
    attempts,
  } = useGameStore();

  const getTileCount = () => {
    switch (difficulty) {
      case "easy":
        return 12;
      case "medium":
        return 18;
      case "hard":
        return 24;
      default:
        return 12;
    }
  };

  const initializeBoard = () => {
    const tileCount = getTileCount();
    const images = getRandomImages(tileCount / 2);

    const newTiles = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isRevealed: false,
        isMatched: false,
      }));
    setTiles(newTiles);
    setRevealedTiles([]);
    resetGame();
    startGame();
  };

  useEffect(() => {
    initializeBoard();
  }, [difficulty]);

  const handleTileClick = (id: number) => {
    if (revealedTiles[0]?.id === id) return;

    console.log(id);
    setTiles((prevTiles) => {
      const newTiles = prevTiles.map((tile) =>
        tile.id === id ? { ...tile, isRevealed: true } : tile
      );

      const newRevealedTiles = [
        ...revealedTiles,
        newTiles.find((tile) => tile.id === id)!,
      ];
      console.log("newRevealedTiles", newRevealedTiles);
      if (newRevealedTiles.length === 2) {
        setAttempts(useGameStore.getState().attempts + 1);

        if (newRevealedTiles[0].image === newRevealedTiles[1].image) {
          newTiles.forEach((tile) => {
            if (
              tile.image === newRevealedTiles[0].image ||
              tile.image === newRevealedTiles[1].image
            ) {
              tile.isMatched = true;
              tile.isRevealed = true;
            }
          });
        } else {
          setTimeout(() => {
            setTiles((currentTiles) =>
              currentTiles.map((tile) =>
                !tile.isMatched ? { ...tile, isRevealed: false } : tile
              )
            );
            setRevealedTiles([]);
          }, 1000);
        }
      } else {
        console.log("newRevealedTiles", newRevealedTiles);
        setRevealedTiles(newRevealedTiles);
      }

      return newTiles;
    });

    setTimeout(() => {
      if (tiles.every((tile) => tile.isMatched)) {
        console.log("Game Over");
        finishGame();
      }
    }, 0);
  };

  useEffect(() => {
    if (tiles.length > 0 && tiles.every((tile) => tile.isMatched)) {
      console.log("Game Over");
      finishGame();
    }
  }, [tiles]);

  return (
    <div className="game-board">
      {isGameFinished ? (
        <div className="game-over">
          <h1>Game Over</h1>
          <p>You finished the game in {attempts} attempts.</p>
          <button onClick={initializeBoard}>Play Again</button>
        </div>
      ) : (
        tiles.map((tile) => (
          <Tile
            key={tile.id}
            {...tile}
            onClick={() => handleTileClick(tile.id)}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
