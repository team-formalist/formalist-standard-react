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

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _input = require('../../ui/input');

var _input2 = _interopRequireDefault(_input);

var _textField = require('./text-field.mcss');

var _textField2 = _interopRequireDefault(_textField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import components


// Import styles


/**
 * Text field
 */
var TextField = _react2.default.createClass({
  displayName: 'TextField',


  propTypes: {
    actions: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    attributes: _react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string,
      hint: _react2.default.PropTypes.string,
      placeholder: _react2.default.PropTypes.string,
      inline: _react2.default.PropTypes.bool,
      code: _react2.default.PropTypes.bool,
      password: _react2.default.PropTypes.bool
    }),
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    errors: _reactImmutableProptypes2.default.list,
    value: _react2.default.PropTypes.string
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
    var _props = this.props;
    var attributes = _props.attributes;
    var errors = _props.errors;
    var hint = _props.hint;
    var label = _props.label;
    var name = _props.name;
    var value = _props.value;

    var hasErrors = errors.count() > 0;
    var type = attributes.password ? 'password' : 'text';

    // Set up field classes
    var fieldClassNames = (0, _classnames2.default)(_textField2.default.base, _defineProperty({}, '' + _textField2.default.baseInline, attributes.inline));

    // Set up input classes
    var inputClassNames = (0, _classnames2.default)(_defineProperty({}, '' + _textField2.default.code, attributes.code));

    return _react2.default.createElement(
      'div',
      { className: fieldClassNames },
      _react2.default.createElement(
        'div',
        { className: _textField2.default.header },
        _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
      ),
      _react2.default.createElement(
        'div',
        { className: _textField2.default.display },
        _react2.default.createElement(_input2.default, {
          type: type,
          id: name,
          error: hasErrors,
          className: inputClassNames,
          placeholder: attributes.placeholder,
          defaultValue: value,
          onChange: this.onChange }),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

exports.default = TextField;