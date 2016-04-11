import uid from 'uid'

/**
 * previewIsImage
 * return a bool if the name contains a file type in the pattern
 * @param  {string} name
 * @return {bool}
 */

function previewIsImage (name) {
  return (/.(jpg|jpeg|gif|png|bmp|svg)$/).test(name)
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
 * containsObject
 * A helper to determin if an object exists in an array
 * @param {object} obj
 * @param {array} list
 * @return {boolean}
 */

function containsObject (obj, list) {
  let x
  for (x in list) {
    if (list.hasOwnProperty(x) && list[x] === obj) {
      return true
    }
  }
  return false
}

/**
 * generateUniqueID
 * @return {[type]} [description]
 */

function generateUniqueID (file_name) {
  return uid(10) + '_' + file_name
}

/**
 * noOp
 * Default param value
 * @return {Function}
 */

const noOp = (_) => {}

export {
  previewIsImage,
  sortArrayByOrder,
  containsObject,
  generateUniqueID,
  noOp
}
