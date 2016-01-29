'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _optionClassNames = require('../../../utils/option-class-names');

var _optionClassNames2 = _interopRequireDefault(_optionClassNames);

var _radioButton = require('../../ui/radio-button');

var _radioButton2 = _interopRequireDefault(_radioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDisplayRadio = _react2.default.createClass({
  displayName: 'StringDisplayRadio',

  propTypes: {
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    config: _react2.default.PropTypes.object,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  render: function render() {
    var _props = this.props;
    var config = _props.config;
    var onChange = _props.onChange;
    var name = _props.name;
    var value = _props.value;

    var optionValues = config.option_values;
    // Return nothing if we have no values
    if (optionValues && optionValues.count() === 0) {
      return false;
    }

    var stringFieldClassNames = (0, _classnames2.default)('fm-field-string', 'fm-field-string--radio', 'fm-radio-group', (0, _optionClassNames2.default)('fm-field-string', config.display_options));

    return _react2.default.createElement(
      'div',
      { className: stringFieldClassNames },
      optionValues.map(function (option, i) {
        var optionValue = undefined,
            optionLabel = undefined;
        if (_immutable.List.isList(option)) {
          optionValue = option.get(0);
          optionLabel = option.get(1) || optionValue;
        } else {
          optionValue = option;
          optionLabel = option;
        }
        var defaultChecked = value && optionValue === value;
        return _react2.default.createElement(_radioButton2.default, { key: i, name: name, label: optionLabel, value: optionValue, defaultChecked: defaultChecked, onChange: onChange });
      })
    );
  }
});

// Components

exports.default = StringDisplayRadio;