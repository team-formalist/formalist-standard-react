'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _radioButton = require('../../ui/radio-button');

var _radioButton2 = _interopRequireDefault(_radioButton);

var _radioButtons = require('./radio-buttons.mcss');

var _radioButtons2 = _interopRequireDefault(_radioButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import components


// Import styles


/**
 * Radio Buttons field
 */
var RadioButtons = _react2.default.createClass({
  displayName: 'RadioButtons',


  propTypes: {
    actions: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    attributes: _react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string,
      hint: _react2.default.PropTypes.string,
      placeholder: _react2.default.PropTypes.string,
      options: _react2.default.PropTypes.array.isRequired,
      inline: _react2.default.PropTypes.bool
    }),
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    errors: _reactImmutableProptypes2.default.list,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
  },

  getInitialState: function getInitialState() {
    // Create unique id for the group
    return {
      groupId: name + '__' + (0, _uid2.default)(10)
    };
  },


  /**
   * Enable parent to pass context
   */

  contextTypes: {
    globalConfig: _react2.default.PropTypes.object
  },

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange: function onChange(e) {
    var value = e.target.value;
    this.props.actions.edit(function (val) {
      return value;
    });
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var attributes = _props.attributes;
    var errors = _props.errors;
    var hint = _props.hint;
    var label = _props.label;
    var name = _props.name;
    var value = _props.value;

    var hasErrors = errors.count() > 0;

    // Set up field classes
    var fieldClassNames = (0, _classnames2.default)(_radioButtons2.default.base, _defineProperty({}, '' + _radioButtons2.default.baseInline, attributes.inline));

    // Extract options
    var options = attributes.options;
    // Return nothing if we have no values
    if (options && options.length === 0) {
      return false;
    }

    return _react2.default.createElement(
      'div',
      { className: fieldClassNames },
      _react2.default.createElement(
        'div',
        { className: _radioButtons2.default.header },
        _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
      ),
      _react2.default.createElement(
        'div',
        { className: _radioButtons2.default.display },
        options.map(function (option, i) {
          var optionValue = void 0,
              optionLabel = void 0;
          if (Array.isArray(option)) {
            optionValue = option[0];
            optionLabel = option[1] || optionValue;
          } else {
            optionValue = option;
            optionLabel = option;
          }
          var defaultChecked = value && optionValue === value;
          return _react2.default.createElement(_radioButton2.default, {
            key: i,
            name: _this.state.groupId,
            label: optionLabel,
            error: hasErrors,
            value: optionValue,
            defaultChecked: defaultChecked,
            onChange: _this.onChange });
        }),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

exports.default = RadioButtons;