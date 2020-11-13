/**
 * get random number between 1 and max
 * @param {number} max
 */
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};
