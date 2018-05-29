'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/en-au');

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _popunder = require('../popunder');

var _popunder2 = _interopRequireDefault(_popunder);

var _datePicker = require('./date-picker.mcss');

var _datePicker2 = _interopRequireDefault(_datePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Components


// Styles


// Set up simple localeUtils that always sets first day of week to Monday
var localeUtils = Object.assign({}, _reactDayPicker.LocaleUtils, { getFirstDayOfWeek: function getFirstDayOfWeek(locale) {
    return 1;
  } });

/**
 * Expand date from YYYY-MM-DD to l
 */
function expandDate(dateString) {
  return (0, _moment2.default)(dateString, 'YYYY-MM-DD').format('l');
}

/**
 * Compress date from l to YYYY-MM-DD
 */
function compressDate(dateString) {
  return (0, _moment2.default)(dateString, 'l').format('YYYY-MM-DD');
}

var DatePicker = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.props.value ? expandDate(_this.props.value) : '',
      month: _this.props.month || new Date()
    }, _this.onInputChange = function (e, value) {
      // Change the current month only if the value entered by the user is a valid
      // date, according to the `L` format
      if ((0, _moment2.default)(value, 'l', true).isValid()) {
        _this.setState({
          month: (0, _moment2.default)(value, 'l').toDate(),
          value: value
        }, _this.showCurrentDate);
        // Pass the value back
        var storedValue = compressDate(value);
        _this.props.onChange(storedValue);
      } else {
        _this.setState({
          value: value
        }, _this.showCurrentDate);
      }
    }, _this.showCurrentDate = function () {
      _this._daypicker.showMonth(_this.state.month);
    }, _this.onInputFocus = function (e) {
      _this._popunder.openPopunder();
    }, _this.onDayClick = function (e, day) {
      var value = (0, _moment2.default)(day).format('l');
      _this.setState({
        value: value,
        month: day
      });
      // Pass the value back
      var storedValue = compressDate(value);
      _this.props.onChange(storedValue);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== this.props.value) {
        this.setState({
          value: expandDate(nextProps.value)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var id = _props.id;
      var className = _props.className;
      var error = _props.error;
      var placeholder = _props.placeholder;
      var value = this.state.value;

      var selectedDay = (0, _moment2.default)(this.state.value, 'l', true).toDate();

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          _popunder2.default,
          {
            ref: function ref(c) {
              _this2._popunder = c;
            },
            closeOnEsc: true,
            closeOnOutsideClick: true
          },
          _react2.default.createElement(_input2.default, {
            id: id,
            error: error,
            placeholder: placeholder,
            value: value,
            onChange: this.onInputChange,
            onFocus: this.onInputFocus
          }),
          _react2.default.createElement(
            'div',
            { className: _datePicker2.default.daypickerContainer },
            _react2.default.createElement(_reactDayPicker2.default, {
              ref: function ref(c) {
                _this2._daypicker = c;
              },
              locale: 'en-AU',
              localeUtils: localeUtils,
              initialMonth: this.state.month,
              modifiers: {
                selected: function selected(day) {
                  return _reactDayPicker.DateUtils.isSameDay(selectedDay, day);
                }
              },
              onDayClick: this.onDayClick
            })
          )
        )
      );
    }
  }]);

  return DatePicker;
}(_react2.default.Component);

DatePicker.propTypes = {
  className: _propTypes2.default.string,
  value: _propTypes2.default.string,
  error: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  month: _propTypes2.default.number,
  onChange: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string
};
DatePicker.defaultProps = {
  placeholder: 'Select a date'
};
exports.default = DatePicker;