export const chunk = (array, length) => new Array(Math.ceil(array.length / length)).fill(0)
    .map((i, n) => array.slice(n * length, n * length + length));

export const ucFirst = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

/**
 * Deeply clones an object.
 *
 * @param {Object} object The object to clone.
 *
 * @return {Object}
 */
const cloneDeep = (object) => {
    if (!object) {
        return object;
    }

    const newObject = Array.isArray(object) ? [] : {};

    Object.keys(object).forEach((key) => {
        const c = object[key];

        newObject[key] = (c === null ? null : (typeof c === 'object') ? cloneDeep(c) : c);
    });

    return newObject;
};

/**
 * Edits properties of an object.
 *
 * @note To dive into multi-dimentional objects, supply a key with dot syntax.
 *
 * @param {Object} obj The object to edit
 * @param {Object} mixins [{ key, value }]
 *
 * @return {Object}
 *
 * Usage:
 *     const mixed = mixinParams(
 *         { foo: 'bar', bar: { baz: 'foo' } },
 *         [{ key: 'foo', value: 'foo' }, { key: 'bar.baz', value: 'baz' }]
 *     )
 */
export const editObject = (obj, mixins) => {
    const mixed = cloneDeep(obj);

    mixins.forEach(({ key, value }) => {
        // We're attempting to access an object
        if (key.indexOf('.') > -1) {
            const keys = key.split('.');

            keys.reduce((acc, k, index) => (index === keys.length - 1
                // We're at the top of our tree!
                ? (acc[k] = value)
                // We've still got a tree to climb!
                : acc[k] || (acc[k] = {})
            ), mixed);
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
 * @param {Number} limit The time before the function can be called again
 *
 * Usage: throttle(() => console.log('hi'), 1000)
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
 * @param {String} hex The hexadecimal string.
 *
 * @return {Array<Number>}
 */
export const hexToRGB = hex =>
    (hex.charAt(0) === '#' ? hex.substr(1) : hex)
        .match(/.{1,2}/g)
        .map(h => parseInt(h, 16));
