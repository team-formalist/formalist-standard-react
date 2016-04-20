'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findWithRegex = require('find-with-regex');

var _findWithRegex2 = _interopRequireDefault(_findWithRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UL_REGEX = /^\*\s/g;

exports.default = function (contentBlock, callback) {
  (0, _findWithRegex2.default)(UL_REGEX, contentBlock, callback);
};