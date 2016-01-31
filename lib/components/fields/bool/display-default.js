'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _optionClassNames = require('../../../utils/option-class-names');

var _optionClassNames2 = _interopRequireDefault(_optionClassNames);

var _checkbox = require('../../ui/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default display class for `bool` type fields. Shows the field as a checkbox
 * followed by "Truthy question <label>"
 */
var BoolDisplayDefault = _react2.default.createClass({
  displayName: 'BoolDisplayDefault',

  propTypes: {
    name: _react2.default.PropTypes.string.isRequired,
    label: _react2.default.PropTypes.string.isRequired,
    value: _react2.default.PropTypes.bool,
    config: _react2.default.PropTypes.object,
    onChange: _react2.default.PropTypes.func
  },

  render: function render() {
    var _props = this.props;
    var config = _props.config;
    var error = _props.error;
    var onChange = _props.onChange;
    var label = _props.label;
    var name = _props.name;
    var value = _props.value;

    var boolFieldClassNames = (0, _classnames2.default)('fm-field-bool', 'fm-checkbox', (0, _optionClassNames2.default)('fm-field-bool', config.display_options));

    var checkboxLabel = config.question_text || label;

    return _react2.default.createElement(
      'div',
      { className: boolFieldClassNames },
      _react2.default.createElement(_checkbox2.default, {
        name: name,
        label: checkboxLabel,
        error: error,
        value: value,
        defaultChecked: value,
        onChange: onChange })
    );
  }
});

// Components

exports.default = BoolDisplayDefault;