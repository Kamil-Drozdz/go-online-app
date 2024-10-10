import "./GameStats.scss";

interface GameStatsProps {
  difficulty: "easy" | "medium" | "hard";
  attempts: number;
  timeElapsed: number;
}

const GameStats = ({ difficulty, attempts, timeElapsed }: GameStatsProps) => {
  return (
    <div className="game-stats">
      <h2>Game Stats</h2>
      <p>Difficulty: {difficulty}</p>
      <p>Attempts: {attempts}</p>
      <p>Time: {timeElapsed} seconds</p>
    </div>
  );
};

export default GameStats;
