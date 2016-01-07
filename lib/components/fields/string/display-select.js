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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDisplaySelect = _react2.default.createClass({
  displayName: 'StringDisplaySelect',

  propTypes: {
    onChange: _react2.default.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    config: _react2.default.PropTypes.object
  },

  render: function render() {
    var _props = this.props;
    var config = _props.config;
    var value = _props.value;

    var optionValues = config.option_values;
    // Return nothing if we have no values
    if (optionValues && optionValues.count() === 0) {
      return false;
    }

    var stringFieldClassNames = (0, _classnames2.default)('fm-field-string', 'fm-field-string--select', 'fm-select', (0, _optionClassNames2.default)('fm-field-string', config.display_options));

    return _react2.default.createElement(
      'select',
      { className: stringFieldClassNames, defaultValue: value, onChange: this.props.onChange },
      optionValues.map(function (option, i) {
        var value = option.get(0);
        var label = option.get(1) || optionValue;
        return _react2.default.createElement(
          'option',
          { key: i, value: value },
          label
        );
      })
    );
  }
});

exports.default = StringDisplaySelect;