'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompoundFieldFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compoundField = require('./compound-field.mcss');

var _compoundField2 = _interopRequireDefault(_compoundField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CompoundField = function CompoundField(_ref) {
  var errors = _ref.errors;
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    { className: _compoundField2.default.base },
    children
  );
};

exports.default = CompoundField;
var CompoundFieldFactory = exports.CompoundFieldFactory = _react2.default.createFactory(CompoundField);