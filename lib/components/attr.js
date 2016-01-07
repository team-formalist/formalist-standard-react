'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttrFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Attr = function Attr(_ref) {
  var errors = _ref.errors;
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    { className: 'fm-attr' },
    children
  );
};

exports.default = Attr;
var AttrFactory = exports.AttrFactory = _react2.default.createFactory(Attr);