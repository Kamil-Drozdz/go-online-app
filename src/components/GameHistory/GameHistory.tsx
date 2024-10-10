import { useState, useEffect } from "react";
import { getGameHistory } from "../../utils/localStorage";
import "./GameHistory.scss";
import { useGameStore } from "../../store/gameStore";

interface GameHistoryEntry {
  attempts: number;
  timeElapsed: number;
  difficulty: string;
  date: string;
}

const GameHistory = () => {
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);
  const { isGameFinished } = useGameStore();

  useEffect(() => {
    setHistory(getGameHistory() as unknown as GameHistoryEntry[]);
  }, [isGameFinished]);

  return (
    <div className="game-history">
      <h2>Game History</h2>
      <ul>
        {history.map((game, index) => (
          <li className="game-history-item" key={index}>
            <span>Date: {new Date(game.date).toLocaleString()}</span>
            <span>Difficulty: {game.difficulty}</span>
            <span>Attempts: {game.attempts}</span>
            <span>Time: {game.timeElapsed} seconds</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;
