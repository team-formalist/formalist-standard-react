'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noOp = exports.generateUniqueID = exports.containsObject = exports.sortArrayByOrder = exports.filenameIsImage = undefined;

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * filenameIsImage
 * return a bool if the name contains a file type in the pattern
 * @param  {string} name
 * @return {bool}
 */

function filenameIsImage(filename) {
  return (/.(jpg|jpeg|gif|png|bmp|svg)$/.test(filename)
  );
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

function sortArrayByOrder(arr, order) {
  var sorted = [];
  for (var i = 0; i < order.length; i++) {
    sorted.push(arr[order[i]]);
  }
  return sorted;
}

/**
 * containsObject
 * A helper to determin if an object exists in an array
 * @param {object} obj
 * @param {array} list
 * @return {boolean}
 */

function containsObject(obj, list) {
  var x = void 0;
  for (x in list) {
    if (list.hasOwnProperty(x) && list[x] === obj) {
      return true;
    }
  }
  return false;
}

/**
 * generateUniqueID
 * @return {[type]} [description]
 */

function generateUniqueID(file_name) {
  return (0, _uid2.default)(10) + '_' + file_name;
}

/**
 * noOp
 * Default param value
 * @return {Function}
 */

var noOp = function noOp(_) {};

exports.filenameIsImage = filenameIsImage;
exports.sortArrayByOrder = sortArrayByOrder;
exports.containsObject = containsObject;
exports.generateUniqueID = generateUniqueID;
exports.noOp = noOp;