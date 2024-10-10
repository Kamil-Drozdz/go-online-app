import "./Tile.scss";

interface TileProps {
  id: number;
  image: string;
  isRevealed: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Tile = ({ image, isRevealed, isMatched, onClick }: TileProps) => {
  return (
    <div
      className={`tile ${isRevealed ? "revealed" : ""} ${
        isMatched ? "matched" : ""
      }`}
      onClick={onClick}
    >
      {isRevealed && <img src={image} alt="tile" />}
    </div>
  );
};

export default Tile;
