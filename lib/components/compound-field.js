'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompoundFieldFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _emotion = require('emotion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  base: /*#__PURE__*/(0, _emotion.css)()
};

var CompoundField = function CompoundField(_ref) {
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    { className: styles.base },
    children
  );
};

CompoundField.propTypes = {
  children: _reactImmutableProptypes2.default.list
};

exports.default = CompoundField;
var CompoundFieldFactory = exports.CompoundFieldFactory = _react2.default.createFactory(CompoundField);