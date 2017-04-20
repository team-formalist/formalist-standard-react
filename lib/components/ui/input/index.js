'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withoutKeys = require('../../../utils/without-keys');

var _withoutKeys2 = _interopRequireDefault(_withoutKeys);

var _input = require('./input.mcss');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Input
 *
 * States:
 * - focus
 * - error
 *
 * Sizes:
 * - small
 * - normal*
 * - large
 *
 */
var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
    }, _this.onChange = function (e) {
      _this.props.onChange(e, e.target.value);
    }, _this.getInput = function () {
      return _this._input;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Public
   */


  _createClass(Input, [{
    key: 'render',
    value: function render() {
      var _classNames,
          _this2 = this;

      var inputClassNames = (0, _classnames2.default)(this.props.className, _input2.default.input, (_classNames = {}, _defineProperty(_classNames, '' + _input2.default.error, this.props.error), _defineProperty(_classNames, '' + _input2.default.focus, this.state.focus), _classNames), '' + _input2.default[this.props.size]);

      var propsToPass = (0, _withoutKeys2.default)(this.props, ['error', 'size', 'className', 'onBlur', 'onChange', 'onFocus']);

      return _react2.default.createElement('input', _extends({
        ref: function ref(r) {
          _this2._input = r;
        }
      }, propsToPass, {
        onChange: this.onChange,
        className: inputClassNames,
        onBlur: this.onBlur,
        onFocus: this.onFocus
      }));
    }
  }]);

  return Input;
}(_react2.default.Component);

Input.propTypes = {
  className: _propTypes2.default.string,
  error: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge'])
};
Input.defaultProps = {
  error: false,
  size: 'normal',
  type: 'text'
};
exports.default = Input;