export const generateRandomString = (length = 20) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const generateRandomInt = (min, max) => Math.floor((Math.random() * ((max - min) + 1)) + min);
