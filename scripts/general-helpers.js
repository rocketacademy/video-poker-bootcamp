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

const incrementOneToObjProp = (obj, property) => {
  if (typeof obj[property] !== `number`) {
    if (isNoU(obj[property])) {
      obj[property] = 0;
    } else {
      console.warn(
        `[addOneToObjProp] the property ${property} of object is assigned to a non-scalar value.`
      );
      return;
    }
  }
  obj[property] += 1;
};

/**
 *
 * @param {*} obj
 * @param {Array<*>} prop
 * @param {*} element
 */
const addElementToPropInObject = (obj, prop, element) => {
  obj[prop].push(element);
};
