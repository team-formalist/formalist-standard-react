'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowEquals = require('shallow-equals');

var _shallowEquals2 = _interopRequireDefault(_shallowEquals);

var _label = require('../../../ui/label');

var _label2 = _interopRequireDefault(_label);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A common header component for every field. Renders the label and an optional
 * hint.
 */
var FieldHeader = function (_React$Component) {
  _inherits(FieldHeader, _React$Component);

  function FieldHeader() {
    _classCallCheck(this, FieldHeader);

    return _possibleConstructorReturn(this, (FieldHeader.__proto__ || Object.getPrototypeOf(FieldHeader)).apply(this, arguments));
  }

  _createClass(FieldHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEquals2.default)(this.props, nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var id = _props.id;
      var label = _props.label;
      var hint = _props.hint;

      if (!label && !hint) {
        return null;
      }
      var labelClassNames = (0, _classnames2.default)(styles.base, styles.label, _defineProperty({}, '' + styles.error, this.props.error));
      var hintClassNames = (0, _classnames2.default)(styles.base, styles.hint, _defineProperty({}, '' + styles.error, this.props.error));
      return _react2.default.createElement(
        'div',
        { className: styles.base },
        label ? _react2.default.createElement(
          _label2.default,
          { htmlFor: id, className: labelClassNames },
          label
        ) : null,
        hint ? _react2.default.createElement(
          'span',
          { className: hintClassNames },
          hint
        ) : null
      );
    }
  }]);

  return FieldHeader;
}(_react2.default.Component);

FieldHeader.propTypes = {
  id: _propTypes2.default.string,
  label: _propTypes2.default.string,
  hint: _propTypes2.default.string,
  error: _propTypes2.default.bool
};
exports.default = FieldHeader;