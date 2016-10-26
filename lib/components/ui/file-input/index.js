'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _triggerEvent = require('trigger-event');

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import classNames from 'classnames'
// import styles from './index.mcss'

exports.default = _react2.default.createClass({

  /**
   * displayName
   */

  displayName: 'FileInput',

  /**
   * propTypes
   */

  propTypes: {
    className: _react2.default.PropTypes.string,
    name: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  /**
   * getDefaultProps
   */

  getDefaultProps: function getDefaultProps() {
    return {
      resetInput: false
    };
  },


  /**
   * onClearInput
   * reset teh value of the file input
   */

  onClearInput: function onClearInput() {
    this.refs.fileInput.value = '';
  },


  /**
   * triggerClickEvent
   * Clear the input
   */

  triggerClickEvent: function triggerClickEvent() {
    (0, _triggerEvent2.default)(this.refs.fileInput, 'click');
  },


  /**
   * componentWillReceiveProps
   * Check if we need to reset the file input
   */

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.clearInput) {
      this.onClearInput();
    }

    if (nextProps.triggerClick) {
      this.triggerClickEvent();
    }
  },


  /**
   * render
   * @return {vnode}
   */

  render: function render() {
    var _props = this.props,
        name = _props.name,
        onChange = _props.onChange,
        className = _props.className;


    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement('input', {
        ref: 'fileInput',
        type: 'file',
        className: className,
        name: name,
        id: name,
        onChange: onChange })
    );
  }
});