export const getRandomIndexes = (array, count) => {
  const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, count).map((item) => array.indexOf(item));
};

export const generateRandomPositions = (count) => {
  const positions = [];
  const imageWidth = 200;
  const imageHeight = 200;

  for (let i = 0; i < count; i++) {
    let left, top;
    do {
      left = Math.random() * (500 - imageWidth);
      top = Math.random() * (700 - imageHeight);
    } while (checkOverlap(positions, left, top, imageWidth, imageHeight));

    positions.push({ left: `${left}px`, top: `${top}px` });
  }
  return positions;
};

export const checkOverlap = (existingPositions, left, top, width, height) => {
  for (const pos of existingPositions) {
    const xOverlap =
      left < pos.left + width + 20 && left + width + 20 > pos.left;
    const yOverlap = top < pos.top + height + 20 && top + height + 20 > pos.top;
    if (xOverlap && yOverlap) {
      return true;
    }
  }
  return false;
};
