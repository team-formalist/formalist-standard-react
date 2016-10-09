'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withoutKeys = require('../../../utils/without-keys');

var _withoutKeys2 = _interopRequireDefault(_withoutKeys);

var _input = require('./input.mcss');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var Input = _react2.default.createClass({
  displayName: 'Input',

  propTypes: {
    className: _react2.default.PropTypes.string,
    error: _react2.default.PropTypes.bool,
    onChange: _react2.default.PropTypes.func,
    onBlur: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    size: _react2.default.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      error: false,
      size: 'normal',
      type: 'text'
    };
  },
  getInitialState: function getInitialState() {
    return {
      focus: false
    };
  },
  onFocus: function onFocus(e) {
    this.setState({ focus: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },
  onBlur: function onBlur(e) {
    this.setState({ focus: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },
  onChange: function onChange(e) {
    this.props.onChange(e, e.target.value);
  },


  /**
   * Public
   */
  getInput: function getInput() {
    return this._input;
  },
  render: function render() {
    var _classNames,
        _this = this;

    var inputClassNames = (0, _classnames2.default)(this.props.className, _input2.default.input, (_classNames = {}, _defineProperty(_classNames, '' + _input2.default.error, this.props.error), _defineProperty(_classNames, '' + _input2.default.focus, this.state.focus), _classNames), '' + _input2.default[this.props.size]);

    var propsToPass = (0, _withoutKeys2.default)(this.props, ['error', 'size', 'className', 'onBlur', 'onChange', 'onFocus']);

    return _react2.default.createElement('input', _extends({
      ref: function ref(r) {
        _this._input = r;
      }
    }, propsToPass, {
      onChange: this.onChange,
      className: inputClassNames,
      onBlur: this.onBlur,
      onFocus: this.onFocus
    }));
  }
});

exports.default = Input;