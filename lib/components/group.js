'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = function Group(_ref) {
  var name = _ref.name;
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    { className: 'fm-group' },
    children.map(function (child, index) {
      return _react2.default.createElement(
        'div',
        { key: index, className: 'fm-group__item' },
        child
      );
    })
  );
};

exports.default = Group;
var GroupFactory = exports.GroupFactory = _react2.default.createFactory(Group);