'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _errors = require('./errors.mcss');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A common component for rendering errors for a field.
 */
var FieldErrors = _react2.default.createClass({
  displayName: 'FieldErrors',


  propTypes: {
    errors: _reactImmutableProptypes2.default.list.isRequired
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    return !_immutable2.default.is(this.props.errors, nextProps.errors);
  },
  render: function render() {
    var errors = this.props.errors;

    if (errors.count() === 0) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: _errors2.default.base },
      _react2.default.createElement(
        'ul',
        { className: _errors2.default.list },
        errors.map(function (error, i) {
          return _react2.default.createElement(
            'li',
            { className: _errors2.default.item, key: i },
            error
          );
        })
      )
    );
  }
});

exports.default = FieldErrors;