'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterUniqueObjects = exports.noOp = exports.generateUniqueID = exports.sortArrayByOrder = exports.hasImageFormatType = undefined;

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * hasImageFormatType
 * return a bool if the filename contains an image format type
 * @param  {string} name
 * @return {bool}
 */

function hasImageFormatType(filename) {
  return (/.(jpg|jpeg|gif|png|bmp|svg)$/i.test(filename)
  );
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
  var sorted = [];
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
  return (0, _uid2.default)(10) + '_' + fileName;
}

/**
 * noOp
 * Default param value
 * @return {function}
 */

var noOp = function noOp(_) {};

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

function filterUniqueObjects(primary, secondary) {
  var result = secondary.slice(0);

  primary.map(function (primaryObject) {
    secondary.map(function (secondaryObject, i) {
      if ((0, _lodash2.default)(primaryObject, secondaryObject)) {
        result.splice(i, 1);
      }
    });
  });

  return result;
}

exports.hasImageFormatType = hasImageFormatType;
exports.sortArrayByOrder = sortArrayByOrder;
exports.generateUniqueID = generateUniqueID;
exports.noOp = noOp;
exports.filterUniqueObjects = filterUniqueObjects;