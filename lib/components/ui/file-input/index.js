'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _triggerEvent = require('trigger-event');

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import classNames from 'classnames'
// import styles from './index.mcss'

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.onClearInput = function () {
      _this.refs.fileInput.value = '';
    }, _this.triggerClickEvent = function () {
      (0, _triggerEvent2.default)(_this.refs.fileInput, 'click');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * displayName
   */

  /**
   * propTypes
   */

  /**
   * getDefaultProps
   */

  /**
   * onClearInput
   * reset teh value of the file input
   */

  /**
   * triggerClickEvent
   * Clear the input
   */

  _createClass(_class, [{
    key: 'componentWillReceiveProps',


    /**
     * componentWillReceiveProps
     * Check if we need to reset the file input
     */

    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.clearInput) {
        this.onClearInput();
      }

      if (nextProps.triggerClick) {
        this.triggerClickEvent();
      }
    }

    /**
     * render
     * @return {vnode}
     */

  }, {
    key: 'render',
    value: function render() {
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
  }]);

  return _class;
}(_react2.default.Component);

_class.displayName = 'FileInput';
_class.propTypes = {
  className: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired
};
_class.defaultProps = {
  resetInput: false
};
exports.default = _class;