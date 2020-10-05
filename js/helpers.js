/**
 * Chunk an array.
 *
 * @param {T[]} arr The array.
 * @param {number} length The size of each chunk.
 *
 * @return {T[][]}
 */
export const chunk = (arr, length) =>
  new Array(Math.ceil(arr.length / length))
    .fill(0)
    .map((_, n) => arr.slice(n * length, n * length + length));

/**
 * Uppercase the first character of a string.
 *
 * @param {string} str The string.
 *
 * @return {string}
 */
export const ucFirst = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

/**
 * Deeply clones an object.
 *
 * @param {any} object The object to clone.
 *
 * @return {any}
 */
const cloneDeep = (obj) => {
  if (!obj) {
    return obj;
  }

  const newObject = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    const c = obj[key];

    newObject[key] =
      c === null ? null : typeof c === "object" ? cloneDeep(c) : c;
  });

  return newObject;
};

/**
 * Edits properties of an object.
 *
 * @note To dive into multi-dimentional objects, supply a key with dot syntax.
 *
 * @param {any} obj The object to edit
 * @param {any} mixins [{ key, value }]
 *
 * @return {any}
 *
 * ```
 * const mixed = mixinParams(
 *     { foo: 'bar', bar: { baz: 'foo' } },
 *     [{ key: 'foo', value: 'foo' }, { key: 'bar.baz', value: 'baz' }]
 * )
 * ```
 */
export const editObject = (obj, mixins) => {
  const mixed = cloneDeep(obj);

  mixins.forEach(({ key, value }) => {
    // We're attempting to access an object
    if (key.indexOf(".") > -1) {
      const keys = key.split(".");

      keys.reduce(
        (acc, k, index) =>
          index === keys.length - 1
            ? // We're at the top of our tree!
              (acc[k] = value)
            : // We've still got a tree to climb!
              acc[k] || (acc[k] = {}),
        mixed
      );
    } else {
      mixed[key] = value;
    }
  });

  return mixed;
};

/**
 * Throttles a function call.
 *
 * @param {Function} func The function
 * @param {number} limit The time before the function can be called again
 *
 * ```
 * throttle(() => console.log('hi'), 1000)
 * ```
 */
export const throttle = (func, limit = 250) => {
  let inThrottle;

  return (...args) => {
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);

      inThrottle = true;

      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Converts a hexadecimal value to an RGB array.
 *
 * @param {string} hex The hexadecimal string.
 *
 * @return {number[]}
 */
export const hexToRGB = (hex) =>
  (hex.charAt(0) === "#" ? hex.substr(1) : hex)
    .match(/.{1,2}/g)
    .map((h) => parseInt(h, 16));

/**
 * Generates an rgba css value.
 *
 * @param {number[]} rgb The rgb values.
 * @param {number} alpha The alpha amount (0-1).
 *
 * @return {string}
 */
export const RGBA = (rgb, alpha) => `rgba(${rgb.join(", ")}, ${alpha})`;

/**
 * Get the ordinal for a day.
 *
 * @param {number} day The day.
 *
 * @return {string}
 *
 * @note from https://gist.github.com/jakewtaylor/120eed6f0f49c098902c9d29628163c6
 */
export const ordinal = (day) =>
  ["st", "nd", "rd"][((((day + 90) % 100) - 10) % 10) - 1] || "th";

/**
 * Download a file.
 *
 * @param {any} data The data for the image.
 * @param {string} fileName The name for the file (including the extension).
 *
 * @return {void}
 */
export const downloadFile = (data, fileName) => {
  const extension = fileName.substr(fileName.lastIndexOf("."));

  const uri = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");

  link.href = uri;
  link.setAttribute(
    "download",
    `${fileName ? fileName.split(".")[0] : "file"}${extension}`
  );

  document.body.appendChild(link);

  link.click();

  link.remove();
  window.URL.revokeObjectURL(uri);
};

/**
 * Get a URL parameter from our current URL.
 *
 * @param {string} name the name of the URL parameter we want.
 *
 * @return {string}
 */
export const getUrlParameter = (name) => {
  const result = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp(`[\\?&]${result}=([^&#]*)`);
  const results = regex.exec(window.location.search);

  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};
