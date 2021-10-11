/**
 * Typed Object.entries function.
 */
 export const entries = Object.entries as <T>(
  o: T,
) => [Extract<keyof T, string | number>, T[keyof T]][];

/**
 * Typed Object.values function.
 */
export const values = Object.values as <T>(o: T) => T[keyof T][];

/**
 * Generate a url from `path`.
 *
 * @param {string} path The path.
 *
 * @return {string}
 */
export const url = (path: string): string => `${window.location.origin}${path}`;

/**
 * Convert an object to form data.
 *
 * @param {any} data The object.
 *
 * @return {FormData}
 */
export const toFormData = (data: any): FormData => {
  const convertValue = (v: any, stringifyObjects: boolean = false) => {
      // Form data casts `null` as a string.
      if (v === null) return '';

      if (v instanceof File) return v;

      if (typeof v === 'object' && stringifyObjects) {
          return JSON.stringify(v);
      }

      if (v === true || v === false) return v ? 1 : 0;

      return v;
  };

  return Object.entries(data).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
          value.forEach((v) => {
              acc.append(`${key}[]`, convertValue(v, true));
          });
      } else if (value !== undefined) {
          acc.append(key, convertValue(value));
      }

      return acc;
  }, new FormData());
};

/**
 * Group an array of objects by the value of a key they all have.
 *
 * @param {T[]} arr The array of objects.
 * @param {Function} getKey A callback used to get the value to group by.
 *
 * @return {any}
 */
export const groupBy = <T, K extends string>(
  arr: T[],
  getKey: (item: T) => K,
): Record<K, T[]> =>
  arr.reduce((acc, item) => {
      const key = getKey(item);

      return {
          ...acc,
          [key]: [...(acc[key] || []), item],
      };
  }, {} as Record<K, T[]>);

/**
 * Debounce a function.
 *
 * @param {F} func The function to debounce.
 * @param {number} delay The delay between function calls.
 *
 * @return {F} The debounced function.
 */
export function debounce<F extends (...params: any[]) => void>(
  func: F,
  delay: number,
): F {
  let timeoutID: number;

  return function (this: any, ...args: any[]) {
      clearTimeout(timeoutID);

      timeoutID = window.setTimeout(() => func.apply(this, args), delay);
  } as F;
}

/**
 * Clone an object.
 *
 * @param {T} obj The object to clone.
 *
 * @return {T} The cloned object.
 */
export const clone = <T extends object>(obj: T): T =>
  JSON.parse(JSON.stringify(obj));

/**
 * Convert a hexadecimal string to an rgb array.
 *
 * @param {string} hex The hexadecimal value.
 *
 * @return {[number, number, number]}
 */
export const hexToRGB = (hex: string): [number, number, number] =>
  (hex.charAt(0) === '#' ? hex.substr(1) : hex)
      .match(/.{1,2}/g)!
      .map((s) => parseInt(s, 16)) as [number, number, number];

/**
 * Convert an rgb array and an alpha value to an rgba string.
 *
 * @param {[number, number, number]} rgb The rgb array.
 * @param {number} alpha The alpha value.
 *
 * @return {string}
 */
export const RGBA = (rgb: [number, number, number], alpha: number): string =>
  `rgba(${rgb.join(', ')}, ${alpha})`;

/**
 * Generic a unique array.
 *
 * @param {T} arr The original array.
 * @param {keyof T} key The key.
 *
 * @return {T[]}
 */
export const unique = <T extends {}>(
  arr: T[],
  getKey: (item: T) => string,
): T[] => {
  const map = new Map();

  const result = [];

  for (const item of arr) {
      if (!map.has(getKey(item))) {
          map.set(getKey(item), true);

          result.push(item);
      }
  }

  return result;
};

/**
 * Uppercase the first character of a string.
 *
 * @param {string} str The string.
 *
 * @return {string} The uppercased string.
 */
export const ucFirst = (str: string): string =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

/**
 * Convert a camelCase string to snake_case.
 *
 * @param {string} str The camelCase string.
 *
 * @return {string} The snake_cased string.
 */
export const camelCaseToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * Convert a snake_case string to PascalCase.
 *
 * @param {string} str The snake_case string.
 *
 * @return {string} The PascalCase string.
 */
export const snakeCaseToPascalCase = (str: string): string =>
  str
    .split('_')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('');

/**
 * Convert a PascalCase string to camelCase.
 *
 * @param {string} str The PascalCase string.
 *
 * @return {string} The camelCase string.
 */
export const pascalCaseToCamelCase = (str: string): string =>
  str[0].toLowerCase() + str.slice(1);

/**
 * Is `obj1` === `obj2`?
 *
 * @param {T} obj1 The first object.
 * @param {U} obj2 The second object.
 *
 * @return {boolean}
 */
export const objectsSame = <T extends object, U extends object>(
  obj1: T,
  obj2: U,
): boolean => JSON.stringify(obj1) === JSON.stringify(obj2);

/**
 * Ellipsise a string.
 *
 * @param {string} str The string.
 * @param {number} length The max length of the string.
 *
 * @return {string}
 */
export const ellipsise = (str: string, length: number): string =>
  str.length > length ? `${str.slice(0, length)}...` : str;

/**
 * Create a file from `data`.
 *
 * @param {string} fileName The file name.
 * @param {any} data The blob for the file.
 *
 * @return {void}
 */
export const createAndDownloadFile = (fileName: string, data: any): void => {
  const uri = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');

  link.href = uri;

  link.setAttribute('download', fileName);

  document.body.appendChild(link);

  link.click();
  link.remove();

  window.URL.revokeObjectURL(uri);
};

/**
 * Get a URL parameter from our current URL.
 *
 * @param {string} key The name of the URL parameter we want.
 *
 * @return {string}
 */
export const getUrlParameter = (key: string): string => {
  const result = key.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');

  const results = new RegExp(`[\\?&]${result}=([^&#]*)`).exec(
      window.location.search,
  );

  return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
