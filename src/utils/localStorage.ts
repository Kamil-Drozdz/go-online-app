interface GameHistoryEntry {
  attempts: number;
  timeElapsed: number;
  difficulty: string;
  date: Date;
}

export const saveGameToHistory = (game: GameHistoryEntry) => {
  const history = JSON.parse(localStorage.getItem("gameHistory") || "[]");
  history.push(game);
  localStorage.setItem("gameHistory", JSON.stringify(history));
};

export const getGameHistory = (): GameHistoryEntry[] => {
  return JSON.parse(localStorage.getItem("gameHistory") || "[]");
};
