'use strict';

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
    children: _react2.default.PropTypes.node,
    error: _react2.default.PropTypes.bool,
    defaultValue: _react2.default.PropTypes.string,
    onFocus: _react2.default.PropTypes.func,
    onBlur: _react2.default.PropTypes.func,
    placeholder: _react2.default.PropTypes.string,
    size: _react2.default.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    valueSeed: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      error: false,
      placeholder: 'Select an option',
      size: 'normal',
      valueSeed: (0, _uid2.default)(10)
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
  render: function render() {
    var _classNames, _classNames2;

    var labelClassNames = (0, _classnames2.default)(_select2.default.label, (_classNames = {}, _defineProperty(_classNames, '' + _select2.default.labelError, this.props.error), _defineProperty(_classNames, '' + _select2.default.labelFocus, this.state.focus), _classNames));
    var inputClassNames = (0, _classnames2.default)(this.props.className, _select2.default.select, (_classNames2 = {}, _defineProperty(_classNames2, '' + _select2.default.error, this.props.error), _defineProperty(_classNames2, '' + _select2.default.focus, this.state.focus), _classNames2), '' + _select2.default[this.props.size]);

    // Generate a placeholder with a fake value seed to trick our <select>
    // into appearing to show it correctly
    var placeholder = _react2.default.createElement(
      'option',
      { value: this.props.valueSeed, hidden: true, disabled: true },
      this.props.placeholder
    ); // eslint-disable-line react/jsx-boolean-value
    var defaultValue = this.props.defaultValue || this.props.valueSeed;

    // Extract any other props
    var id = this.props.id;


    return _react2.default.createElement(
      'label',
      { className: labelClassNames },
      _react2.default.createElement(
        'select',
        {
          id: id,
          defaultValue: defaultValue,
          className: inputClassNames,
          onBlur: this.onBlur,
          onFocus: this.onFocus,
          onChange: this.onChange },
        placeholder,
        this.props.children
      )
    );
  }
});

exports.default = Select;