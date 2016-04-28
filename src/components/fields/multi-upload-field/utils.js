import uid from 'uid'

/**
 * filenameIsImage
 * return a bool if the name contains a file type in the pattern
 * @param  {string} name
 * @return {bool}
 */

function filenameIsImage (filename) {
  return (/.(jpg|jpeg|gif|png|bmp|svg)$/).test(filename)
}

/**
 * sortArrayByOrder
 * Take an array of items (arr) and an array of ordered values (order).
 * For each order value, push that index of `arr` into `sorted`
 * return sorted
 * @param  {array} arr
 * @param  {[array} order
 * @return {array}
 */

function sortArrayByOrder (arr, order) {
  let sorted = []
  for (var i = 0; i < order.length; i++) {
    sorted.push(arr[order[i]])
  }
  return sorted
}

/**
 * generateUniqueID
 * @return {[type]} [description]
 */

function generateUniqueID (fileName) {
  return uid(10) + '_' + fileName
}

/**
 * noOp
 * Default param value
 * @return {Function}
 */

const noOp = (_) => {}

export {
  filenameIsImage,
  sortArrayByOrder,
  generateUniqueID,
  noOp
}
