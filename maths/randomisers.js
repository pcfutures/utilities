export const randomInt = (min, max) => Math.floor((Math.random() * ((max - min) + 1)) + min);

export const randomString = (length = 20) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i += 1) {
        text += possible.charAt(randomInt(0, possible.length - 1));
    }

    return text;
};

export const randomColor = () => `#${[0, 0, 0].map(() => (`0${randomInt(10, 255).toString(16)}`).slice(-2)).join('')}`;

/**
 * Generates a random HSL value.
 *
 * @param {Number} initialH - Hue
 * @param {Number} s - Saturation
 * @param {Number} l - Lightness
 * @param {Number} adjuster - Will slightly adjust the hue, can be used to prevent certain colours.
 *
 * @return {String}
 */
export const randomHSL = (initialH = randomInt(0, 360), s = randomInt(55, 85), l = randomInt(30, 70), adjuster = 0) => {
    const adjuster = 8;

    const h = randomInt(
        initialH - adjuster < 0
            ? 0
            : initialH - adjuster,
        initialH + adjuster > 360
            ? 360
            : initialH + adjuster,
    );

    return `hsl(${h}, ${s}%, ${l}%)`;
};
