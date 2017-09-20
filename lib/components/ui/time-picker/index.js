'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/en-au');

var _popunder = require('../popunder');

var _popunder2 = _interopRequireDefault(_popunder);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Components


// Styles


var dateFormats = {
  time: 'HH:mm:ss',
  humanTime: 'hh:mma'
};

var TimePicker = function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

    _this.onInputChange = function (e, value) {
      var time = (0, _moment2.default)(value, dateFormats.humanTime);
      _this.time = time;
      _this.props.onChange(time.format(dateFormats.time));
    };

    _this.onInputFocus = function () {
      _this._popunder.openPopunder();
    };

    _this.onTimeClick = function (time, e) {
      e.preventDefault();
      _this.time = time;
      _this.setState({
        inputValue: time.format(dateFormats.humanTime)
      });
      _this.props.onChange(time.format(dateFormats.time));
    };

    _this.renderTimeList = function () {
      // Get midnight
      var date = (0, _moment2.default)().set({
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      // Get the end of the day
      var end = (0, _moment2.default)().endOf('day');
      return _react2.default.createElement(
        'ul',
        null,
        _this.renderTimeItem(date, [], end, _this.time)
      );
    };

    _this.renderTimeItem = function (date, items, end, active) {
      if (end.diff(date) > 0) {
        var _ret = function () {
          // Check if active. We only care about hours/minutes
          var isActive = active && active.hours() === date.hours() && active.minutes() === date.minutes();
          var buttonClassNames = (0, _classnames2.default)(styles.button, _defineProperty({}, '' + styles.buttonActive, isActive));

          var onClick = _this.onTimeClick.bind(_this, date.clone());
          var item = _react2.default.createElement(
            'li',
            { key: date.format(), className: styles.item },
            _react2.default.createElement(
              'button',
              {
                ref: function ref(r) {
                  _this._buttonActive = isActive ? r : null;
                },
                className: buttonClassNames,
                onClick: onClick
              },
              date.format(dateFormats.humanTime)
            )
          );
          items.push(item);
          date = date.add(15, 'minutes');
          return {
            v: _this.renderTimeItem(date, items, end, active)
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } else {
        return items;
      }
    };

    _this.onPopunderOpen = function (e, domNode) {
      if (_this._buttonActive && _this._popunder.getContainer()) {
        var buttonEl = _this._buttonActive;
        var containerEl = _this._popunder.getContainer();
        containerEl.scrollTop = buttonEl.offsetTop;
      }
    };

    var inputValue = void 0;
    var parsedTime = (0, _moment2.default)(props.value, dateFormats.time);
    if (parsedTime.isValid()) {
      _this.time = parsedTime;
      inputValue = parsedTime.format(dateFormats.humanTime);
    }

    _this.state = {
      inputValue: inputValue
    };
    return _this;
  }

  _createClass(TimePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== this.props.value) {
        var parsedTime = (0, _moment2.default)(nextProps.value, dateFormats.time);
        if (parsedTime.isValid()) {
          this.time = parsedTime;
          this.setState({
            inputValue: parsedTime.format(dateFormats.humanTime)
          });
        }
      }
    }

    /**
     * Render a list of human formatted times between midnight and midnight
     * @return {ReactElement} React element containing the list
     */


    /**
     * Recursive function to render time items
     * @param  {Moment} date Context date object
     * @param  {Array} items Array of previous created elements
     * @param  {Moment} end A moment object representing the end of the day
     * @param  {Moment} active A moment object representing the currently selected time
     * @return {Array} Return the array of built up items (or recurse)
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var error = _props.error;
      var placeholder = _props.placeholder;
      var inputValue = this.state.inputValue;


      return _react2.default.createElement(
        'div',
        { className: styles.base },
        _react2.default.createElement(
          _popunder2.default,
          {
            ref: function ref(r) {
              _this2._popunder = r;
            },
            closeOnEsc: true,
            closeOnOutsideClick: true,
            onOpen: this.onPopunderOpen
          },
          _react2.default.createElement(_input2.default, {
            key: inputValue,
            defaultValue: inputValue,
            error: error,
            placeholder: placeholder || 'Select or enter a time',
            onFocus: this.onInputFocus,
            onChange: this.onInputChange
          }),
          this.renderTimeList()
        )
      );
    }
  }]);

  return TimePicker;
}(_react2.default.Component);

TimePicker.propTypes = {
  value: _propTypes2.default.string,
  error: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  placeholder: _propTypes2.default.string
};
exports.default = TimePicker;