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

/**
 * Standard display class for `bool` type fields. Shows the field as a checkbox
 * followed by "Truthy question <label>"
 */
var BoolDisplayStandard = _react2.default.createClass({
  displayName: 'BoolDisplayStandard',

  propTypes: {
    value: _react2.default.PropTypes.number,
    config: _react2.default.PropTypes.object
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var config = _props.config;
    var name = _props.name;
    var label = _props.label;
    var value = _props.value;

    var boolFieldClassNames = (0, _classnames2.default)('fm-field-bool', 'fm-checkbox', (0, _optionClassNames2.default)('fm-field-bool', config.display_options));

    var checkboxLabel = config.question_text || label;

    return _react2.default.createElement(
      'div',
      { className: boolFieldClassNames },
      _react2.default.createElement('input', {
        type: 'checkbox',
        id: name,
        className: 'fm-checkbox__input',
        defaultChecked: value,
        onChange: function onChange(e) {
          return _this.props.onChange(e.target.checked);
        } }),
      _react2.default.createElement(
        'label',
        { htmlFor: name },
        checkboxLabel
      )
    );
  }
});

exports.default = BoolDisplayStandard;