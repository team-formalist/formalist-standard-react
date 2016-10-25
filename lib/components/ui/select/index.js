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
    id: _react2.default.PropTypes.string,
    clearable: _react2.default.PropTypes.bool,
    onFocus: _react2.default.PropTypes.func,
    onBlur: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func.isRequired,
    placeholder: _react2.default.PropTypes.string,
    size: _react2.default.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      clearable: true,
      error: false,
      placeholder: 'Select an option',
      size: 'normal'
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

    var _props = this.props;
    var children = _props.children;
    var className = _props.className;
    var clearable = _props.clearable;
    var defaultValue = _props.defaultValue;
    var error = _props.error;
    var placeholder = _props.placeholder;
    var size = _props.size;
    var focus = this.state.focus;


    var labelClassNames = (0, _classnames2.default)(_select2.default.label, (_classNames = {}, _defineProperty(_classNames, '' + _select2.default.labelError, error), _defineProperty(_classNames, '' + _select2.default.labelFocus, focus), _classNames));
    var inputClassNames = (0, _classnames2.default)(className, _select2.default.select, (_classNames2 = {}, _defineProperty(_classNames2, '' + _select2.default.error, error), _defineProperty(_classNames2, '' + _select2.default.focus, focus), _classNames2), '' + _select2.default[size]);

    // Generate a placeholder with a fake value seed to trick our <select>
    // into appearing to show it correctly
    var placeholderOption = _react2.default.createElement(
      'option',
      {
        value: '',
        hidden: !clearable,
        disabled: !clearable
      },
      placeholder
    );

    // Extract any other props
    var id = this.props.id;


    return _react2.default.createElement(
      'label',
      { className: labelClassNames },
      _react2.default.createElement(
        'select',
        {
          id: id,
          defaultValue: defaultValue || '',
          className: inputClassNames,
          onBlur: this.onBlur,
          onFocus: this.onFocus,
          onChange: this.onChange },
        placeholderOption,
        children
      )
    );
  }
});

exports.default = Select;