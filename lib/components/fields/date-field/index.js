'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _datePicker = require('../../ui/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _dateField = require('./date-field.mcss');

var _dateField2 = _interopRequireDefault(_dateField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import the display types


// Import styles


/**
 * Date Field
 */
var DateField = function (_React$Component) {
  _inherits(DateField, _React$Component);

  function DateField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateField.__proto__ || Object.getPrototypeOf(DateField)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (date) {
      _this.props.actions.edit(function (val) {
        return date;
      });
    }, _this.setDateToNow = function () {
      _this.onChange((0, _moment2.default)().format('YYYY-MM-DD'));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Enable parent to pass context
   */

  /**
   * onChange handler
   *
   * @param  {String} date Date as a YYYY-MM-DD formatted string
   */


  /**
   * setDateToNow
   */


  _createClass(DateField, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var attributes = _props.attributes;
      var errors = _props.errors;
      var hint = _props.hint;
      var label = _props.label;
      var name = _props.name;
      var value = _props.value;

      var hasErrors = errors.count() > 0;

      // Set up field classes
      var fieldClassNames = (0, _classnames2.default)(_dateField2.default.base, _defineProperty({}, '' + _dateField2.default.baseInline, attributes.inline));
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'div',
        { className: fieldClassNames },
        _react2.default.createElement(
          'button',
          { className: _dateField2.default.nowButton, onClick: function onClick(e) {
              e.preventDefault();
              _this2.setDateToNow();
            } },
          'Set to today'
        ),
        _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors }),
        _react2.default.createElement(
          'div',
          { className: _dateField2.default.display },
          _react2.default.createElement(_datePicker2.default, {
            id: name,
            error: hasErrors,
            placeholder: attributes.placeholder,
            value: value,
            onChange: this.onChange })
        ),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return DateField;
}(_react2.default.Component);

DateField.propTypes = {
  actions: _propTypes2.default.object,
  attributes: _propTypes2.default.shape({
    label: _propTypes2.default.string,
    hint: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    inline: _propTypes2.default.bool
  }),
  errors: _reactImmutableProptypes2.default.list,
  hint: _propTypes2.default.string,
  label: _propTypes2.default.string,
  name: _propTypes2.default.string,
  config: _propTypes2.default.object,
  value: _propTypes2.default.string
};
DateField.contextTypes = {
  globalConfig: _propTypes2.default.object
};
exports.default = DateField;