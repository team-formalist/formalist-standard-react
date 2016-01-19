'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _label = require('../../../ui/label');

var _label2 = _interopRequireDefault(_label);

var _header = require('./header.css');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A common header component for every field. Renders the label and an optional
 * hint.
 */
var FieldHeader = _react2.default.createClass({
  displayName: 'FieldHeader',

  propTypes: {
    id: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    hint: _react2.default.PropTypes.string
  },

  render: function render() {
    var _props = this.props;
    var id = _props.id;
    var label = _props.label;
    var hint = _props.hint;

    if (!label && !hint) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: _header2.default.base },
      label ? _react2.default.createElement(
        _label2.default,
        { htmlFor: id, className: _header2.default.label },
        label
      ) : null,
      hint ? _react2.default.createElement(
        'span',
        { className: _header2.default.hint },
        hint
      ) : null
    );
  }
});

exports.default = FieldHeader;