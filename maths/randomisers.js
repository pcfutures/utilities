/**
 * Generate a random integer.
 *
 * @param {number} min The minimum number possible.
 * @param {number} max The maximum number possible.
 *
 * @return {number} The random number.
 */
export const randomInt = (min = 0, max = 5) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Generate a random string.
 *
 * @param {number} length The length of the string.
 *
 * @return {string}
 */
export const randomString = (length = 20) => {
  const alphaNumeric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  return Array(length)
    .fill("")
    .reduce(
      (acc) =>
        `${acc}${alphaNumeric.charAt(randomInt(0, alphaNumeric.length - 1))}`
    );
};

/**
 * Generate a random colour.
 *
 * @return {string} The colour in hex format.
 */
export const randomColor = () =>
  `#${[0, 0, 0]
    .map(() => `0${randomInt(10, 255).toString(16)}`.slice(-2))
    .join("")}`;

/**
 * Generates a random HSL value.
 *
 * @param {number} initialH - Hue
 * @param {number} s - Saturation
 * @param {number} l - Lightness
 * @param {number} adjuster - Will slightly adjust the hue, can be used to prevent certain colours.
 *
 * @return {string}
 */
export const randomHSL = (
  initialH = randomInt(0, 360),
  s = randomInt(55, 85),
  l = randomInt(30, 70),
  adjuster = 0
) => {
  const adjuster = 8;

  const h = randomInt(
    initialH - adjuster < 0 ? 0 : initialH - adjuster,
    initialH + adjuster > 360 ? 360 : initialH + adjuster
  );

  return `hsl(${h}, ${s}%, ${l}%)`;
};
