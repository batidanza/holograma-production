import { useState, useEffect } from "react";
import { useSpring } from "react-spring";
import { useInterval } from "react-use";
import { fetchMedia } from "../../../services/mediaAPI";

import {
  getRandomIndexes,
  generateRandomPositions,
} from "./AnimatedCollectionUtils";

const AnimatedCollectionLogic = () => {
  const [media, setMedia] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [positions, setPositions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMedia = await fetchMedia();
        setMedia(fetchedMedia);
        const initialIndexes = getRandomIndexes(fetchedMedia, 30);
        setIndexes(initialIndexes);
        const initialPositions = generateRandomPositions(30);
        setPositions(initialPositions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artworks", error);
      }
    };

    fetchData();
  }, []);

  const updateIndexesAndPositions = () => {
    const nextIndexes = getRandomIndexes(media, 30);
    setIndexes(nextIndexes);
    const nextPositions = generateRandomPositions(30);
    setPositions(nextPositions);
    setCurrentIndex(nextIndexes[0]);
  };

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
    onRest: updateIndexesAndPositions,
  });

  useInterval(updateIndexesAndPositions, 9000);

  return { props, indexes, positions, currentIndex, media, loading };
};

export default AnimatedCollectionLogic;
