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

var IntDisplayRadio = _react2.default.createClass({
  displayName: 'IntDisplayRadio',

  propTypes: {
    onChange: _react2.default.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.number,
    config: _react2.default.PropTypes.object
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var config = _props.config;
    var name = _props.name;
    var value = _props.value;

    var optionValues = config.option_values;
    // Return nothing if we have no values
    if (optionValues && optionValues.count() === 0) {
      return false;
    }

    var intFieldClassNames = (0, _classnames2.default)('fm-field-int', 'fm-field-int--radio', 'fm-radio-group', (0, _optionClassNames2.default)('fm-field-int', config.display_options));

    return _react2.default.createElement(
      'div',
      { className: intFieldClassNames },
      optionValues.map(function (option, i) {
        var key = name + '-' + i;
        var optionValue = option.get(0);
        var optionLabel = option.get(1) || optionValue;
        var checked = value === optionValue;

        return _react2.default.createElement(
          'div',
          { key: key, className: 'fm-radio-group__input' },
          _react2.default.createElement('input', { id: key, type: 'radio', name: name, value: optionValue, defaultChecked: checked, onChange: _this.props.onChange }),
          _react2.default.createElement(
            'label',
            { htmlFor: key },
            optionLabel
          )
        );
      })
    );
  }
});

exports.default = IntDisplayRadio;