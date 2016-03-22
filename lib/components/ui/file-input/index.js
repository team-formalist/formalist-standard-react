'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
   * clearInput
   * reset teh value of the file input
   */

  clearInput: function clearInput() {
    this.refs.fileInput.value = "";
  },


  /**
   * componentWillReceiveProps
   * Check if we need to reset the file input
   */

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.clearInput) {
      this.clearInput();
    }
  },


  /**
   * render
   * @return {vnode}
   */

  render: function render() {
    var _props = this.props;
    var name = _props.name;
    var onChange = _props.onChange;
    var className = _props.className;


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