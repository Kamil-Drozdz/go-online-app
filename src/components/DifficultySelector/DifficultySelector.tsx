import { useGameStore } from "../../store/gameStore";
import "./DifficultySelector.scss";

interface DifficultySelectorProps {
  onSelect: (difficulty: "easy" | "medium" | "hard") => void;
}

const DifficultySelector = ({ onSelect }: DifficultySelectorProps) => {
  const { difficulty } = useGameStore();
  return (
    <div className="difficulty-selector">
      <button
        className={`difficulty-button ${
          difficulty === "easy" ? "selected" : ""
        }`}
        onClick={() => onSelect("easy")}
      >
        Easy
      </button>
      <button
        className={`difficulty-button ${
          difficulty === "medium" ? "selected" : ""
        }`}
        onClick={() => onSelect("medium")}
      >
        Medium
      </button>
      <button
        className={`difficulty-button ${
          difficulty === "hard" ? "selected" : ""
        }`}
        onClick={() => onSelect("hard")}
      >
        Hard
      </button>
    </div>
  );
};

export default DifficultySelector;
