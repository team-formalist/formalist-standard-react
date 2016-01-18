'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _label = require('../../ui/label');

var _label2 = _interopRequireDefault(_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A common header component for every field. Renders the label and an optional
 * hint.
 */
var FieldHeader = _react2.default.createClass({
  displayName: 'FieldHeader',

  propTypes: {
    label: _react2.default.PropTypes.string,
    hint: _react2.default.PropTypes.string
  },

  render: function render() {
    var _props = this.props;
    var label = _props.label;
    var hint = _props.hint;

    if (!label && !hint) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: 'fm-field-header' },
      label ? _react2.default.createElement(
        _label2.default,
        { className: 'fm-field-header__label' },
        label
      ) : null,
      hint ? _react2.default.createElement(
        'span',
        { className: 'fm-field-header__hint' },
        hint
      ) : null
    );
  }
});

exports.default = FieldHeader;