'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var _dateTimePicker = require('../../ui/date-time-picker');

var _dateTimePicker2 = _interopRequireDefault(_dateTimePicker);

var _dateTimeField = require('./date-time-field.mcss');

var _dateTimeField2 = _interopRequireDefault(_dateTimeField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import the display types


// Import styles


/**
 * Date Time field
 */
var DateTimeField = function (_React$Component) {
  _inherits(DateTimeField, _React$Component);

  function DateTimeField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateTimeField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateTimeField.__proto__ || Object.getPrototypeOf(DateTimeField)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (date) {
      _this.props.actions.edit(function (val) {
        return date;
      });
    }, _this.setToNow = function () {
      _this.onChange((0, _moment2.default)().format(_dateTimePicker.dateFormats.utc));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Enable parent to pass context
   */

  /**
   * onChange handler
   *
   * @param  {String} date Date as a dd/mm/yyyy formatted string
   */


  /**
   * setToNow
   */


  _createClass(DateTimeField, [{
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
      var fieldClassNames = (0, _classnames2.default)(_dateTimeField2.default.base, _defineProperty({}, '' + _dateTimeField2.default.baseInline, attributes.inline));
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'div',
        { className: fieldClassNames },
        _react2.default.createElement(
          'button',
          { className: _dateTimeField2.default.nowButton, onClick: function onClick(e) {
              e.preventDefault();
              _this2.setToNow();
            } },
          'Set to now'
        ),
        _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors }),
        _react2.default.createElement(
          'div',
          { className: _dateTimeField2.default.display },
          _react2.default.createElement(_dateTimePicker2.default, {
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

  return DateTimeField;
}(_react2.default.Component);

DateTimeField.propTypes = {
  actions: _react2.default.PropTypes.object,
  attributes: _react2.default.PropTypes.shape({
    label: _react2.default.PropTypes.string,
    hint: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.string,
    inline: _react2.default.PropTypes.bool
  }),
  errors: _reactImmutableProptypes2.default.list,
  hint: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string,
  config: _react2.default.PropTypes.object,
  value: _react2.default.PropTypes.string
};
DateTimeField.contextTypes = {
  globalConfig: _react2.default.PropTypes.object
};
exports.default = DateTimeField;