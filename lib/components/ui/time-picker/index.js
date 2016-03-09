'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/en-au');

var _popunder = require('../popunder');

var _popunder2 = _interopRequireDefault(_popunder);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _timePicker = require('./time-picker.mcss');

var _timePicker2 = _interopRequireDefault(_timePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Components


// Styles


var dateFormats = {
  time: 'HH:mm:ss',
  humanTime: 'hh:mma'
};

var TimePicker = _react2.default.createClass({
  displayName: 'TimePicker',


  propTypes: {
    defaultValue: _react2.default.PropTypes.string,
    error: _react2.default.PropTypes.bool,
    onChange: _react2.default.PropTypes.func,
    placeholder: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    var inputValue = void 0;
    var parsedTime = (0, _moment2.default)(this.props.defaultValue, dateFormats.time);
    if (parsedTime.isValid()) {
      this.time = parsedTime;
      inputValue = parsedTime.format(dateFormats.humanTime);
    }
    return {
      inputValue: inputValue
    };
  },
  onInputChange: function onInputChange(e) {
    var value = e.target.value;
    var time = (0, _moment2.default)(value, dateFormats.humanTime);
    this.time = time;
    this.props.onChange(time.format(dateFormats.time));
  },
  onInputFocus: function onInputFocus() {
    this.refs.popunder.openPopunder();
  },
  onTimeClick: function onTimeClick(time, e) {
    var _this = this;

    e.preventDefault();
    this.time = time;
    this.setState({
      inputValue: time.format(dateFormats.humanTime)
    }, function () {
      // We have to explicitly set the value of the input
      var inputEl = _reactDom2.default.findDOMNode(_this.refs.timeInput);
      inputEl.value = _this.state.inputValue;
    });
    this.props.onChange(time.format(dateFormats.time));
  },


  /**
   * Render a list of human formatted times between midnight and midnight
   * @return {ReactElement} React element containing the list
   */
  renderTimeList: function renderTimeList() {
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
      this.renderTimeItem(date, [], end, this.time)
    );
  },


  /**
   * Recursive function to render time items
   * @param  {Moment} date Context date object
   * @param  {Array} items Array of previous created elements
   * @param  {Moment} end A moment object representing the end of the day
   * @param  {Moment} active A moment object representing the currently selected time
   * @return {Array} Return the array of built up items (or recurse)
   */
  renderTimeItem: function renderTimeItem(date, items, end, active) {
    if (end.diff(date) > 0) {
      // Check if active. We only care about hours/minutes
      var isActive = active && active.hours() === date.hours() && active.minutes() === date.minutes();
      var buttonClassNames = (0, _classnames2.default)(_timePicker2.default.button, _defineProperty({}, '' + _timePicker2.default.buttonActive, isActive));
      var item = _react2.default.createElement(
        'li',
        { key: date.format(), className: _timePicker2.default.item },
        _react2.default.createElement(
          'button',
          { ref: isActive ? 'buttonActive' : null, className: buttonClassNames, onClick: this.onTimeClick.bind(this, date.clone()) },
          date.format(dateFormats.humanTime)
        )
      );
      items.push(item);
      date = date.add(15, 'minutes');
      return this.renderTimeItem(date, items, end, active);
    } else {
      return items;
    }
  },
  onPopunderOpen: function onPopunderOpen(e, domNode) {
    if (this.refs.buttonActive && this.refs.popunder.getContainer()) {
      var buttonEl = _reactDom2.default.findDOMNode(this.refs.buttonActive);
      var containerEl = _reactDom2.default.findDOMNode(this.refs.popunder.getContainer());
      containerEl.scrollTop = buttonEl.offsetTop;
    }
  },
  render: function render() {
    var _props = this.props;
    var error = _props.error;
    var placeholder = _props.placeholder;


    return _react2.default.createElement(
      'div',
      { className: _timePicker2.default.base },
      _react2.default.createElement(
        _popunder2.default,
        { ref: 'popunder', closeOnEsc: true, closeOnOutsideClick: true, onOpen: this.onPopunderOpen },
        _react2.default.createElement(_input2.default, {
          ref: 'timeInput',
          defaultValue: this.state.inputValue,
          error: error,
          placeholder: placeholder || 'Select or enter a time',
          onFocus: this.onInputFocus,
          onChange: this.onInputChange }),
        this.renderTimeList()
      )
    );
  }
});

exports.default = TimePicker;