'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _modal = require('./modal.mcss');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A "modal" component.
 *
 * Exposes:
 *
 * @method openModal
 * @method closeModal
 * @method getContainer
 */
var Modal = _react2.default.createClass({
  displayName: 'Modal',


  propTypes: {
    beforeClose: _react2.default.PropTypes.func,
    children: _react2.default.PropTypes.node,
    closeOnEsc: _react2.default.PropTypes.bool,
    closeOnOutsideClick: _react2.default.PropTypes.bool,
    openByClickOn: _react2.default.PropTypes.node,
    onOpen: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func,
    onUpdate: _react2.default.PropTypes.func
  },

  /**
   * Public interface: Opens the `Portal`
   */
  openModal: function openModal() {
    return this.refs.portal.openPortal();
  },


  /**
   * Public: Close the `Portal`
   */
  closeModal: function closeModal() {
    return this.refs.portal.closePortal();
  },


  /**
   * Return the `container` node
   */
  getContainer: function getContainer() {
    return this.refs.container;
  },
  onOpen: function onOpen(portalEl) {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.left = "0";
    document.body.style.right = "0";
    if (this.props.onOpen) {
      this.props.onOpen(portalEl);
    }
  },
  onClose: function onClose(portalEl) {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.left = "";
    document.body.style.right = "";
    if (this.props.onClose) {
      this.props.onClose(portalEl);
    }
  },
  onCloseClick: function onCloseClick(e) {
    e.preventDefault();
    this.closeModal();
  },
  onOverlayClick: function onOverlayClick(e) {
    e.preventDefault();
    this.closeModal();
  },
  render: function render() {
    // Extract Portal props
    var _props = this.props;
    var closeOnEsc = _props.closeOnEsc;
    var closeOnOutsideClick = _props.closeOnOutsideClick;
    var openByClickOn = _props.openByClickOn;
    var onOpen = _props.onOpen;
    var beforeClose = _props.beforeClose;
    var onClose = _props.onClose;
    var onUpdate = _props.onUpdate;


    return _react2.default.createElement(
      _reactPortal2.default,
      {
        ref: 'portal',
        closeOnEsc: closeOnEsc,
        closeOnOutsideClick: closeOnOutsideClick,
        openByClickOn: openByClickOn,
        onOpen: this.onOpen,
        beforeClose: beforeClose,
        onClose: this.onClose,
        onUpdate: onUpdate },
      _react2.default.createElement(
        'div',
        { ref: 'container', className: _modal2.default.container },
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
            '×'
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
});

exports.default = Modal;