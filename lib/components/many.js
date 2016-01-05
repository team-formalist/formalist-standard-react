'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManyFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Many = function Many(_ref) {
  var name = _ref.name;
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    { className: 'many' },
    _react2.default.createElement(
      'h3',
      { className: 'many__name' },
      name.replace(/_/, ' ')
    ),
    _react2.default.createElement(
      'div',
      { className: 'many__controls' },
      _react2.default.createElement(
        'button',
        null,
        'Add new ',
        name.replace(/_/, ' ')
      )
    ),
    children
  );
};

exports.default = Many;
var ManyFactory = exports.ManyFactory = _react2.default.createFactory(Many);