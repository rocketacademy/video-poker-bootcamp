/**
 *
 * @param {*} arg
 * @returns {boolean} returns true if argument is null or undefined.
 */
const isNoU = (arg) => arg === undefined || arg === null;

/**
 *
 * @param {[]<*>} args
 * @returns
 */
const isAnyNoU = (...args) => args.some((arg) => isNoU(arg));
