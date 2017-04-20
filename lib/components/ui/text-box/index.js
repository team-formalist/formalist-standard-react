'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withoutKeys = require('../../../utils/without-keys');

var _withoutKeys2 = _interopRequireDefault(_withoutKeys);

var _textBox = require('./text-box.mcss');

var _textBox2 = _interopRequireDefault(_textBox);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Components


/**
 * Return a set of rows as per http://andreypopp.github.io/react-textarea-autosize/
 * based on the boxSize
 * @param  {String} size
 * @return {Object} An object describing the various row properties per-size.
 */
function boxSize(size) {
  var rows = {
    single: {
      rows: 1,
      maxRows: 1
    },
    small: {
      minRows: 3,
      maxRows: 6
    },
    normal: {
      minRows: 5,
      maxRows: 10
    },
    large: {
      minRows: 8,
      maxRows: 16
    },
    xlarge: {
      minRows: 12
    }
  };
  return size ? rows[size] : rows['normal'];
}

/**
 * TextBox
 */

var TextBox = function (_React$Component) {
  _inherits(TextBox, _React$Component);

  function TextBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextBox.__proto__ || Object.getPrototypeOf(TextBox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focus: false
    }, _this.onFocus = function (e) {
      _this.setState({ focus: true });
      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }
    }, _this.onBlur = function (e) {
      _this.setState({ focus: false });
      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextBox, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var textBoxClassNames = (0, _classnames2.default)(this.props.className, _textBox2.default.textBox, (_classNames = {}, _defineProperty(_classNames, '' + _textBox2.default.error, this.props.error), _defineProperty(_classNames, '' + _textBox2.default.focus, this.state.focus), _classNames), '' + _textBox2.default[this.props.textSize]);

      var propsToPass = (0, _withoutKeys2.default)(this.props, ['error', 'textSize', 'boxSize', 'className', 'onBlur', 'onFocus']);

      return _react2.default.createElement(_reactTextareaAutosize2.default, _extends({}, propsToPass, boxSize(this.props.boxSize), {
        className: textBoxClassNames,
        onBlur: this.onBlur,
        onFocus: this.onFocus }));
    }
  }]);

  return TextBox;
}(_react2.default.Component);

TextBox.propTypes = {
  className: _react2.default.PropTypes.string,
  error: _react2.default.PropTypes.bool,
  onFocus: _react2.default.PropTypes.func,
  onBlur: _react2.default.PropTypes.func,
  textSize: _react2.default.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
  boxSize: _react2.default.PropTypes.oneOf(['single', 'small', 'normal', 'large', 'xlarge'])
};
TextBox.defaultProps = {
  error: false,
  textSize: 'normal',
  boxSize: 'normal'
};
exports.default = TextBox;