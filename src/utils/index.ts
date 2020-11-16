/**
 * get random number between min and max
 * @param {number} min default 1
 * @param {number} max
 */
export const getRandomInt = (min: number = 1, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
