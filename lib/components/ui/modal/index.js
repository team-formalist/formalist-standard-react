'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _modal = require('./modal.mcss');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A 'modal' component.
 *
 * Exposes:
 *
 * @method openModal
 * @method closeModal
 * @method getContainer
 */
var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpened: false
    }, _this.openModal = function () {
      _this.setState({
        isOpened: true
      });
    }, _this.closeModal = function () {
      _this.setState({
        isOpened: false
      });
    }, _this.toggleModal = function () {
      _this.isOpened ? _this.closeModal() : _this.openModal();
    }, _this.getContainer = function () {
      return _this._container;
    }, _this.handleOutsideMouseClick = function (e) {
      if (!_this.state.isOpened) {
        return;
      }

      // Extract the elements based on `ref` values. The actual portal element is
      // nested within the react-portal instance as it gets rendered out of
      // context
      var portalEl = _this._portal.portal;
      var containerEl = _this._container;

      if (portalEl && portalEl.contains(e.target) || containerEl && containerEl.contains(e.target)) {
        return;
      }

      e.stopPropagation();
      _this.closeModal();
    }, _this.handleKeydown = function (e) {
      var closeOnEsc = _this.props.closeOnEsc;
      // ESCAPE = 27

      if (closeOnEsc && e.keyCode === 27 && _this.state.isOpened) {
        _this.closeModal();
      }
    }, _this.onOpen = function (portalEl) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.left = '0';
      document.body.style.right = '0';
      if (_this.props.onOpen) {
        _this.props.onOpen(portalEl);
      }
    }, _this.onClose = function (portalEl) {
      _this.isOpened = false;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.left = '';
      document.body.style.right = '';
      if (_this.props.onClose) {
        _this.props.onClose(portalEl);
      }
    }, _this.onCloseClick = function (e) {
      e.preventDefault();
      _this.closeModal();
    }, _this.onOverlayClick = function (e) {
      e.preventDefault();
      _this.closeModal();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var closeOnOutsideClick = this.props.closeOnOutsideClick;

      document.addEventListener('keydown', this.handleKeydown);
      if (closeOnOutsideClick) {
        document.addEventListener('mouseup', this.handleOutsideMouseClick);
        document.addEventListener('touchstart', this.handleOutsideMouseClick);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var closeOnOutsideClick = this.props.closeOnOutsideClick;

      document.removeEventListener('keydown', this.handleKeydown);
      if (closeOnOutsideClick) {
        document.removeEventListener('mouseup', this.handleOutsideMouseClick);
        document.removeEventListener('touchstart', this.handleOutsideMouseClick);
      }
    }

    /**
     * Public interface: Opens the `Portal`
     */


    /**
     * Public: Close the `Portal`
     */


    /**
     * Public: Toggle the `Portal`
     */


    /**
     * Return the `container` node
     */


    /**
     * Close the portal if a click-outside occurs
     * @param  {Event} e MouseUp/TouchStart event
     * @return {Null}
     */


    /**
     * Close portal if escape is pressed
     * @param  {KeyboardEvent} e
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // Extract Portal props
      var _props = this.props;
      var beforeClose = _props.beforeClose;
      var onUpdate = _props.onUpdate;
      var isOpened = this.state.isOpened;


      return _react2.default.createElement(
        _reactPortal2.default,
        {
          ref: function ref(c) {
            _this2._portal = c;
          },
          beforeClose: beforeClose,
          isOpened: isOpened,
          onOpen: this.onOpen,
          onClose: this.onClose,
          onUpdate: onUpdate },
        _react2.default.createElement(
          'div',
          { ref: function ref(c) {
              _this2._container = c;
            }, className: _modal2.default.container },
          _react2.default.createElement(
            'button',
            { className: _modal2.default.close, onClick: this.onCloseClick },
            _react2.default.createElement(
              'span',
              { className: _modal2.default.closeText },
              'Close'
            ),
            _react2.default.createElement(
              'div',
              { className: _modal2.default.closeX },
              '\xD7'
            )
          ),
          _react2.default.createElement('button', { className: _modal2.default.overlay, onClick: this.onOverlayClick }),
          _react2.default.createElement(
            'div',
            { className: _modal2.default.content },
            this.props.children
          )
        )
      );
    }
  }]);

  return Modal;
}(_react2.default.Component);

Modal.propTypes = {
  beforeClose: _react2.default.PropTypes.func,
  children: _react2.default.PropTypes.node,
  closeOnEsc: _react2.default.PropTypes.bool,
  closeOnOutsideClick: _react2.default.PropTypes.bool,
  onOpen: _react2.default.PropTypes.func,
  onClose: _react2.default.PropTypes.func,
  onUpdate: _react2.default.PropTypes.func
};
exports.default = Modal;