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

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

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

var timepickerOffset = {
  left: 0,
  top: 0
};

var TimePicker = _react2.default.createClass({
  displayName: 'TimePicker',
  getInitialState: function getInitialState() {
    var inputValue = undefined;
    var parsedTime = (0, _moment2.default)(this.props.defaultValue, dateFormats.time);
    if (parsedTime.isValid()) {
      this.time = parsedTime;
      inputValue = parsedTime.format(dateFormats.humanTime);
    }
    return {
      inputValue: inputValue,
      timepickerPosition: {
        left: 0,
        top: 0
      }
    };
  },
  componentWillMount: function componentWillMount() {
    window.addEventListener('resize', this.onResize);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  componentDidMount: function componentDidMount() {
    this.calculateTimepickerPosition();
  },
  onResize: function onResize(e) {
    this.calculateTimepickerPosition();
  },
  onInputChange: function onInputChange(e) {
    var value = e.target.value;
    var time = (0, _moment2.default)(value, dateFormats.humanTime);
    this.time = time;
    this.props.onChange(time.format(dateFormats.time));
  },
  onInputFocus: function onInputFocus() {
    this.refs.timepickerPortal.openPortal();
    this.calculateTimepickerPosition();
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
  calculateTimepickerPosition: function calculateTimepickerPosition() {
    // Only bother if its rendered
    var inputEl = _reactDom2.default.findDOMNode(this.refs.timeInput);
    var inputPosition = inputEl.getBoundingClientRect();
    this.setState({
      timepickerPosition: {
        left: inputPosition.left + timepickerOffset.left,
        top: inputPosition.top + inputPosition.height + timepickerOffset.top
      }
    });
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
  onPortalOpen: function onPortalOpen(e, domNode) {
    if (this.refs.buttonActive && this.refs.timepickerContainer) {
      var buttonEl = _reactDom2.default.findDOMNode(this.refs.buttonActive);
      var containerEl = _reactDom2.default.findDOMNode(this.refs.timepickerContainer);
      containerEl.scrollTop = buttonEl.offsetTop;
    }
  },
  render: function render() {
    var _props = this.props;
    var error = _props.error;
    var placeholder = _props.placeholder;
    var defaultValue = _props.defaultValue;


    return _react2.default.createElement(
      'div',
      { className: _timePicker2.default.base },
      _react2.default.createElement(_input2.default, {
        ref: 'timeInput',
        defaultValue: this.state.inputValue,
        placeholder: 'Select or enter a time',
        onFocus: this.onInputFocus,
        onChange: this.onInputChange }),
      _react2.default.createElement(
        _reactPortal2.default,
        { ref: 'timepickerPortal', closeOnEsc: true, closeOnOutsideClick: true, onOpen: this.onPortalOpen },
        _react2.default.createElement(
          'div',
          { ref: 'timepickerContainer', className: _timePicker2.default.timepickerContainer, style: this.state.timepickerPosition },
          this.renderTimeList()
        )
      )
    );
  }
});

exports.default = TimePicker;