'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _select = require('./select.mcss');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select
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
var Select = _react2.default.createClass({
  displayName: 'Select',

  propTypes: {
    className: _react2.default.PropTypes.string,
    error: _react2.default.PropTypes.bool,
    size: _react2.default.PropTypes.oneOf(['mini', 'small', 'normal', 'large', 'huge'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      error: false,
      reversed: false,
      size: 'normal',
      type: 'text'
    };
  },
  getInitialState: function getInitialState() {
    return {
      focus: false
    };
  },
  render: function render() {
    var _classNames,
        _classNames2,
        _this = this;

    var labelClassNames = (0, _classnames2.default)(_select2.default.label, (_classNames = {}, _defineProperty(_classNames, '' + _select2.default.labelError, this.props.error), _defineProperty(_classNames, '' + _select2.default.labelFocus, this.state.focus), _classNames));
    var inputClassNames = (0, _classnames2.default)(this.props.className, _select2.default.select, (_classNames2 = {}, _defineProperty(_classNames2, '' + _select2.default.error, this.props.error), _defineProperty(_classNames2, '' + _select2.default.focus, this.state.focus), _classNames2), '' + _select2.default[this.props.size]);

    // Generate a placeholder with a fake value seed to trick our <select>
    // into appearing to show it correctly
    var valueSeed = (0, _uid2.default)(10);
    var placeholder = _react2.default.createElement(
      'option',
      { value: valueSeed, hidden: true, disabled: true },
      'Select an option'
    );
    var defaultValue = this.props.defaultValue || valueSeed;

    return _react2.default.createElement(
      'label',
      { className: labelClassNames },
      _react2.default.createElement(
        'select',
        _extends({}, this.props, {
          defaultValue: defaultValue,
          className: inputClassNames,
          onBlur: function onBlur() {
            return _this.setState({ focus: false });
          },
          onFocus: function onFocus() {
            return _this.setState({ focus: true });
          } }),
        placeholder,
        this.props.children
      )
    );
  }
});

exports.default = Select;