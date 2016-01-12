'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Import the display types

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _displayDefault = require('./display-default');

var _displayDefault2 = _interopRequireDefault(_displayDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Set up an object that holds all the `display_variants` by matching key
 * @type {Object}
 */
var displayVariants = {};

/**
 * Base class for the float field
 *
 * Sets up any common methods and UI across _all_ float fields and then
 * determines the `display_variant` class to include.
 *
 */
var BoolBase = _react2.default.createClass({
  displayName: 'BoolBase',

  propTypes: {
    actions: _react2.default.PropTypes.object,
    config: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    value: _react2.default.PropTypes.bool,
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    errors: _reactImmutableProptypes2.default.list
  },

  /**
   * Common onChange handler for boolean
   *
   * @param  {Boolean} value True/false that updates the field
   */
  onChange: function onChange(value) {
    this.props.actions.edit(function (val) {
      return value;
    });
  },
  render: function render() {
    var _props = this.props;
    var config = _props.config;
    var errors = _props.errors;
    var hint = _props.hint;
    // Determine the React class to render based on the display_variant configuration

    var BoolDisplay = config.display_variant ? displayVariants[config.display_variant] : _displayDefault2.default;

    return _react2.default.createElement(
      'div',
      { className: 'fm-field__base' },
      _react2.default.createElement(_header2.default, { hint: hint }),
      _react2.default.createElement(
        'div',
        { className: 'fm-field__display' },
        _react2.default.createElement(BoolDisplay, _extends({ onChange: this.onChange }, this.props))
      ),
      errors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
    );
  }
});

exports.default = BoolBase;