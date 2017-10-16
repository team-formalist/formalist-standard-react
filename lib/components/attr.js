'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttrFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _emotion = require('emotion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  base: /*#__PURE__*/(0, _emotion.css)()
};

var Attr = function Attr(_ref) {
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    { className: styles.base },
    children
  );
};

Attr.propTypes = {
  children: _reactImmutableProptypes2.default.list
};

exports.default = Attr;
var AttrFactory = exports.AttrFactory = _react2.default.createFactory(Attr);