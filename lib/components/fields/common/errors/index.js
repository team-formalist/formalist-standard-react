'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A common component for rendering errors for a field.
 */
var FieldErrors = function (_React$Component) {
  _inherits(FieldErrors, _React$Component);

  function FieldErrors() {
    _classCallCheck(this, FieldErrors);

    return _possibleConstructorReturn(this, (FieldErrors.__proto__ || Object.getPrototypeOf(FieldErrors)).apply(this, arguments));
  }

  _createClass(FieldErrors, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !_immutable2.default.is(this.props.errors, nextProps.errors);
    }
  }, {
    key: 'render',
    value: function render() {
      var errors = this.props.errors;

      if (errors.count() === 0) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: styles.base },
        _react2.default.createElement(
          'ul',
          { className: styles.list },
          errors.map(function (error, i) {
            return _react2.default.createElement(
              'li',
              { className: styles.item, key: i },
              error
            );
          })
        )
      );
    }
  }]);

  return FieldErrors;
}(_react2.default.Component);

FieldErrors.propTypes = {
  errors: _reactImmutableProptypes2.default.list.isRequired
};
exports.default = FieldErrors;