import uid from 'uid'
import isEqual from 'lodash.isequal'

/**
 * hasImageFormatType
 * return a bool if the filename contains an image format type
 * @param  {string} name
 * @return {bool}
 */

function hasImageFormatType (filename) {
  return (/.(jpg|jpeg|gif|png|bmp|svg)$/).test(filename)
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

function sortArrayByOrder (arr, order) {
  let sorted = []
  for (var i = 0; i < order.length; i++) {
    sorted.push(arr[order[i]])
  }
  return sorted
}

/**
 * generateUniqueID
 * @return {string}
 */

function generateUniqueID (fileName) {
  return uid(10) + '_' + fileName
}

/**
 * noOp
 * Default param value
 * @return {function}
 */

const noOp = (_) => {}

/**
 * filterUniqueObjects
 * Take a primary and secondary array.
 * Remove any objects in the 'secondary' array that already exist in the
 * 'primary' array.
 * Return the 'result'
 * @param  {array} primary
 * @param  {array} secondary
 * @return {array} result
 */

function filterUniqueObjects (primary, secondary) {
  let result = secondary.slice(0)

  primary.map((primaryObject) => {
    secondary.map((secondaryObject, i) => {
      if (isEqual(primaryObject, secondaryObject)) {
        result.splice(i, 1)
      }
    })
  })

  return result
}

export {
  hasImageFormatType,
  sortArrayByOrder,
  generateUniqueID,
  noOp,
  filterUniqueObjects
}
