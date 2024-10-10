import { create } from "zustand";
import { persist } from "zustand/middleware";
import { saveGameToHistory } from "../utils/localStorage";

interface GameState {
  attempts: number;
  timeElapsed: number;
  difficulty: "easy" | "medium" | "hard";
  isGameStarted: boolean;
  isGameFinished: boolean;
  setAttempts: (attempts: number) => void;
  setTimeElapsed: (time: number) => void;
  setDifficulty: (difficulty: "easy" | "medium" | "hard") => void;
  startGame: () => void;
  finishGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      attempts: 0,
      timeElapsed: 0,
      difficulty: "easy",
      isGameStarted: false,
      isGameFinished: false,
      setAttempts: (attempts) => set({ attempts }),
      setTimeElapsed: (time) => set({ timeElapsed: time }),
      setDifficulty: (difficulty) => set({ difficulty }),
      startGame: () => set({ isGameStarted: true, isGameFinished: false }),
      finishGame: () => {
        set({ isGameFinished: true });
        const { attempts, timeElapsed, difficulty } = get();
        saveGameToHistory({
          attempts,
          timeElapsed,
          difficulty,
          date: new Date(),
        });
      },
      resetGame: () =>
        set({
          attempts: 0,
          timeElapsed: 0,
          isGameStarted: false,
          isGameFinished: false,
        }),
    }),
    {
      name: "game-storage",
    }
  )
);
