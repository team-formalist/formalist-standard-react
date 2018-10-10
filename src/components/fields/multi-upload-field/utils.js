import uid from "uid";

/**
 * hasImageFormatType
 * return a bool if the filename contains an image format type
 * @param  {string} name
 * @return {bool}
 */

function hasImageFormatType(filename) {
  return /.(jpg|jpeg|gif|png|bmp|svg)$/i.test(filename);
}

/**
 * sortArrayByOrder
 * Take an array of items (arr) and an array of ordered values (order).
 * For each order value, push that index of `arr` into `sorted`
 * return sorted
 * @param  {array} arr
 * @param  {array} order
 * @return {array}
 */

function sortArrayByOrder(arr, order) {
  let sorted = [];
  for (var i = 0; i < order.length; i++) {
    sorted.push(arr[order[i]]);
  }
  return sorted;
}

/**
 * generateUniqueID
 * @return {string}
 */

function generateUniqueID(fileName) {
  return uid(10) + "_" + fileName;
}

/**
 * noOp
 * Default param value
 * @return {function}
 */

const noOp = _ => {};

/**
 * sanitiseFileName
 * @param {String} fileName Name of file
 */
function sanitiseFileName(fileName) {
  return fileName
    .trim()
    .replace(/[^\w\s-.+]/g, "") // Remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+|\++/g, "-") // Swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, "");
}

export {
  hasImageFormatType,
  sortArrayByOrder,
  generateUniqueID,
  noOp,
  sanitiseFileName
};
