import { useEffect } from "react";
import { useGameStore } from "./store/gameStore";
import GameBoard from "./components/GameBoard/GameBoard";
import GameStats from "./components/GameStats/GameStats";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";
import GameHistory from "./components/GameHistory/GameHistory";
import "./App.scss";

const App = () => {
  const {
    difficulty,
    setDifficulty,
    setTimeElapsed,
    isGameStarted,
    isGameFinished,
    attempts,
    timeElapsed,
  } = useGameStore();

  useEffect(() => {
    let timer: number;
    if (isGameStarted && !isGameFinished) {
      timer = window.setInterval(() => {
        setTimeElapsed(useGameStore.getState().timeElapsed + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameStarted, isGameFinished, setTimeElapsed]);

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <DifficultySelector onSelect={setDifficulty} />
      <GameStats
        difficulty={difficulty}
        attempts={attempts}
        timeElapsed={timeElapsed}
      />
      <GameBoard difficulty={difficulty} />
      <GameHistory />
    </div>
  );
};

export default App;
