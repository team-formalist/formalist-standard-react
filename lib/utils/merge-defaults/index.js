import assignInWith from "lodash.assigninwith";
import partialRight from "lodash.partialright";

/**
 * Customizer function for assignInWith
 * @param  {Mixed} objectValue Value from the object
 * @param  {Mixed} sourceValue Value from the source
 * @return {Mixed} Whichever of the above values is defined
 */
function assignIfDefined(objectValue, sourceValue) {
  return objectValue == null ? sourceValue : objectValue;
}

/**
 * Curry lodash’s assignInWith with a customizer function that only overrites
 * object values if they are defined.
 * @type {Function}
 */
export default partialRight(assignInWith, assignIfDefined);