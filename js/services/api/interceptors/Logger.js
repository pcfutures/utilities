/* eslint-disable no-console */

const labelStyle = 'font-weight: bold; font-size: 12px';

const maybeJson = (potentialJson) => {
    try {
        const json = JSON.parse(potentialJson);
        return json;
    } catch (e) {
        return potentialJson;
    }
};

const url = ({ request: { responseURL } }) => (responseURL || null);

const params = (obj) => {
    const config = obj.config || obj;
    return maybeJson(config.params || false);
};

const data = (obj) => {
    const config = obj.config || obj;

    if (['put', 'patch', 'post'].includes(config.method.toLowerCase())) {
        return maybeJson(config.data);
    }

    return false;
};

const method = (obj) => {
    const config = obj.config || obj;

    return config.method.toUpperCase();
};

const status = obj => (obj
    ? obj.status || (obj.response ? obj.response.status : false) || false
    : null);

const response = obj => maybeJson(obj.data || (obj.response ? obj.response.data : false));

const showParams = obj => console.log(
    '%cParameters: %o',
    labelStyle,
    params(obj),
);

const showData = obj => console.log(
    '%cData: %o',
    labelStyle,
    data(obj),
);

const showResponse = obj => console.log(
    '%cResponse: %o',
    labelStyle,
    response(obj),
);

const showObject = obj => console.log(
    '%cObject: %o',
    labelStyle,
    obj,
);

/**
 * Logs either a HTTP Request or a HTTP Response
 * @param {Object} object - The HTTP Request/Response
 * @returns {Object} The untouched HTTP Request/Response
 */
const success = (object) => {
    if (object) {
        console.groupCollapsed('%c%s %s %c%s', 'color: #57e836', status(object), method(object), 'color: grey', url(object));
        showParams(object);
        showData(object);
        showResponse(object);
        showObject(object);
        console.groupEnd();
    }

    return object;
};

/**
 * Logs an error of either a HTTP Request or a HTTP Response
 * @param {Object} object - The Error object
 * @returns {Promise} The rejected error
 */
const error = (object) => {
    console.groupCollapsed('%c%s %s %c%s', 'color: red', status(object), method(object), 'color: grey', url(object));
    showParams(object);
    showData(object);
    showResponse(object);
    showObject(object);
    console.groupEnd();

    return Promise.reject(object);
};

export const Logger = { success, error };
