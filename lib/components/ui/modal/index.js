'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _modal = require('./modal.mcss');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A 'modal' component.
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
    onOpen: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func,
    onUpdate: _react2.default.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      isOpened: false
    };
  },
  componentWillMount: function componentWillMount() {
    var closeOnOutsideClick = this.props.closeOnOutsideClick;

    document.addEventListener('keydown', this.handleKeydown);
    if (closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    var closeOnOutsideClick = this.props.closeOnOutsideClick;

    document.removeEventListener('keydown', this.handleKeydown);
    if (closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick);
      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    }
  },


  /**
   * Public interface: Opens the `Portal`
   */
  openModal: function openModal() {
    this.setState({
      isOpened: true
    });
  },


  /**
   * Public: Close the `Portal`
   */
  closeModal: function closeModal() {
    this.setState({
      isOpened: false
    });
  },


  /**
   * Public: Toggle the `Portal`
   */
  toggleModal: function toggleModal() {
    this.isOpened ? this.closeModal() : this.openModal();
  },


  /**
   * Return the `container` node
   */
  getContainer: function getContainer() {
    return this._container;
  },


  /**
   * Close the portal if a click-outside occurs
   * @param  {Event} e MouseUp/TouchStart event
   * @return {Null}
   */
  handleOutsideMouseClick: function handleOutsideMouseClick(e) {
    if (!this.state.isOpened) {
      return;
    }

    // Extract the elements based on `ref` values. The actual portal element is
    // nested within the react-portal instance as it gets rendered out of
    // context
    var portalEl = (0, _reactDom.findDOMNode)(this._portal.portal);
    var containerEl = (0, _reactDom.findDOMNode)(this._container);

    if (portalEl && portalEl.contains(e.target) || containerEl && containerEl.contains(e.target)) {
      return;
    }

    e.stopPropagation();
    this.closeModal();
  },


  /**
   * Close portal if escape is pressed
   * @param  {KeyboardEvent} e
   */
  handleKeydown: function handleKeydown(e) {
    var closeOnEsc = this.props.closeOnEsc;
    // ESCAPE = 27

    if (closeOnEsc && e.keyCode === 27 && this.state.isOpened) {
      this.closePopunder();
    }
  },
  onOpen: function onOpen(portalEl) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.left = '0';
    document.body.style.right = '0';
    if (this.props.onOpen) {
      this.props.onOpen(portalEl);
    }
  },
  onClose: function onClose(portalEl) {
    this.isOpened = false;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.left = '';
    document.body.style.right = '';
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
    var _this = this;

    // Extract Portal props
    var _props = this.props;
    var beforeClose = _props.beforeClose;
    var onUpdate = _props.onUpdate;
    var isOpened = this.state.isOpened;

    return _react2.default.createElement(
      _reactPortal2.default,
      {
        ref: function ref(c) {
          return _this._portal = c;
        },
        beforeClose: beforeClose,
        isOpened: isOpened,
        onOpen: this.onOpen,
        onClose: this.onClose,
        onUpdate: onUpdate },
      _react2.default.createElement(
        'div',
        { ref: function ref(c) {
            return _this._container = c;
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