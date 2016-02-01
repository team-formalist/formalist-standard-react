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

var _input = require('../../ui/input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDisplayDefault = _react2.default.createClass({
  displayName: 'StringDisplayDefault',

  propTypes: {
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    error: _react2.default.PropTypes.bool,
    config: _react2.default.PropTypes.object,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  render: function render() {
    var _props = this.props;
    var config = _props.config;
    var error = _props.error;
    var onChange = _props.onChange;
    var name = _props.name;
    var value = _props.value;

    var stringFieldClassNames = (0, _classnames2.default)('fm-field-string', 'fm-input', 'fm-input--text', (0, _optionClassNames2.default)('fm-field-string', config.display_options));

    var type = config.password ? 'password' : 'text';

    return _react2.default.createElement(_input2.default, {
      type: type,
      id: name,
      error: error,
      className: stringFieldClassNames,
      placeholder: config.placeholder,
      defaultValue: value,
      onChange: onChange });
  }
});

// Components

exports.default = StringDisplayDefault;