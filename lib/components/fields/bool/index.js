'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Import the display types

// Import styles

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayVariants = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _optionClassNames = require('../../../utils/option-class-names');

var _optionClassNames2 = _interopRequireDefault(_optionClassNames);

var _extractDisplayVariant = require('../../../utils/extract-display-variant');

var _extractDisplayVariant2 = _interopRequireDefault(_extractDisplayVariant);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _displayDefault = require('./display-default');

var _displayDefault2 = _interopRequireDefault(_displayDefault);

var _bool = require('./bool.mcss');

var _bool2 = _interopRequireDefault(_bool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Set up an object that holds all the `display_variants` by matching key
 * @type {Object}
 */
var displayVariants = exports.displayVariants = {
  'default': _displayDefault2.default
};

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
    var displayVariant = _props.displayVariant;
    var errors = _props.errors;
    var hint = _props.hint;

    var hasErrors = errors.count() > 0;
    // Determine the React class to render based on the display_variant configuration
    var Display = (0, _extractDisplayVariant2.default)(displayVariant, Object.assign({}, this.props.displayVariants, displayVariants), 'bool');

    return _react2.default.createElement(
      'div',
      { className: _bool2.default.base },
      _react2.default.createElement(_header2.default, { hint: hint, error: hasErrors }),
      _react2.default.createElement(
        'div',
        { className: _bool2.default.display },
        _react2.default.createElement(Display, _extends({
          onChange: this.onChange,
          className: (0, _classnames2.default)((0, _optionClassNames2.default)(_bool2.default, config.display_options)),
          error: hasErrors
        }, this.props))
      ),
      hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
    );
  }
});

exports.default = BoolBase;