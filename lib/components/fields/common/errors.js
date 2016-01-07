'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A common component for rendering errors for a field.
 */
var FieldErrors = _react2.default.createClass({
  displayName: 'FieldErrors',

  propTypes: {
    errors: _reactImmutableProptypes2.default.list.isRequired
  },

  render: function render() {
    var errors = this.props.errors;

    if (errors.count() === 0) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: 'fm-field-errors' },
      _react2.default.createElement(
        'ul',
        { className: 'fm-field-errors__list' },
        errors.map(function (error, i) {
          return _react2.default.createElement(
            'li',
            { className: 'fm-field-errors__error', key: i },
            error
          );
        })
      )
    );
  }
});

exports.default = FieldErrors;