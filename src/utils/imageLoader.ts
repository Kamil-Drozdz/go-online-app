import cat from "../assets/cat.jfif";
import dog from "../assets/dog.jfif";
import monkey from "../assets/monkey.jfif";
import giraffe from "../assets/giraffe.jfif";
import lama from "../assets/lama.jfif";
import fox from "../assets/fox.jfif";

const images = [cat, dog, monkey, giraffe, lama, fox];

export const getRandomImages = (count: number): string[] => {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
