'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _popunder = require('./popunder.mcss');

var _popunder2 = _interopRequireDefault(_popunder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A "popunder" component. Creates a element that hangs under the passed
 * `reference` element.
 *
 * The reference element is the node that the popunder takes its position from
 * it’s expected that this is the _first_ element in `props.children`.
 *
 * All other children are assumed to be part of the content of the underhanging
 * `container` and will be rendered there in order. The `container` is rendered
 * into a `Portal`, which an element that’s appended to the `<body>` to avoid
 * any DOM flow complications.
 *
 * Takes an `props.offset {top, left}` to adjust position
 *
 * Exposes:
 *
 * @method calculatePosition
 * @method openPopunder
 * @method closePopunder
 * @method getContainer
 */
var Popunder = _react2.default.createClass({
  displayName: 'Popunder',

  isOpened: false,

  propTypes: {
    beforeClose: _react2.default.PropTypes.func,
    children: _react2.default.PropTypes.node,
    closeOnEsc: _react2.default.PropTypes.bool,
    closeOnOutsideClick: _react2.default.PropTypes.bool,
    offset: _react2.default.PropTypes.shape({
      left: _react2.default.PropTypes.number,
      top: _react2.default.PropTypes.number
    }),
    openByClickOn: _react2.default.PropTypes.node,
    onOpen: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func,
    onUpdate: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      offset: {
        left: 0,
        top: 0
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      position: {
        left: 0,
        top: 0
      }
    };
  },
  componentDidMount: function componentDidMount() {
    window.requestAnimationFrame(this.calculatePosition);
  },
  componentWillMount: function componentWillMount() {
    var closeOnOutsideClick = this.props.closeOnOutsideClick;

    document.addEventListener('resize', this.onResize);
    if (closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    var closeOnOutsideClick = this.props.closeOnOutsideClick;

    document.removeEventListener('resize', this.onResize);
    if (closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick);
      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    }
  },


  /**
   * Public interface: Calculate the position of the popunder wrapper
   * @return {Object} Updated position we're setting
   */
  calculatePosition: function calculatePosition() {
    // Only bother if its rendered
    var referencePosition = this._reference.getBoundingClientRect();
    var scrollX = window.scrollX;
    var scrollY = window.scrollY;
    var position = {
      left: referencePosition.left + scrollX + this.props.offset.left,
      top: referencePosition.top + scrollY + referencePosition.height + this.props.offset.top
    };
    this.setState({
      position: position
    });
    return position;
  },


  /**
   * Public interface: Opens the `Portal`
   */
  openPopunder: function openPopunder() {
    this.calculatePosition();
    this._portal.openPortal();
  },


  /**
   * Public: Close the `Portal`
   */
  closePopunder: function closePopunder() {
    this._portal.openPortal();
  },


  /**
   * Public: Toggle the `Portal`
   */
  togglePopunder: function togglePopunder() {
    this.isOpened ? this.closePopunder() : this.openPopunder();
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
    if (!this.isOpened) {
      return;
    }

    // Extract the elements based on `ref` values. The actual portal element is
    // nested within the react-portal instance as it gets rendered out of
    // context
    var portalEl = (0, _reactDom.findDOMNode)(this._portal.portal);
    var referenceEl = (0, _reactDom.findDOMNode)(this._reference);

    if (portalEl && portalEl.contains(e.target) || referenceEl && referenceEl.contains(e.target)) {
      return;
    }

    e.stopPropagation();
    this._portal.closePortal();
  },


  /**
   * Handle position on resize
   * @param  {Event} e ResizeEvent
   */
  onResize: function onResize(e) {
    this.calculatePosition();
  },


  /**
   * Keep track of open/close state
   */
  onOpen: function onOpen() {
    this.isOpened = true;
    var onOpen = this.props.onOpen;

    if (onOpen) {
      onOpen();
    }
  },


  /**
   * Keep track of open/close state
   */
  onClose: function onClose() {
    this.isOpened = false;
    var onClose = this.props.onClose;

    if (onClose) {
      onClose();
    }
  },
  render: function render() {
    var _this = this;

    // Extract Portal props
    var _props = this.props;
    var closeOnEsc = _props.closeOnEsc;
    var openByClickOn = _props.openByClickOn;
    var beforeClose = _props.beforeClose;
    var onUpdate = _props.onUpdate;
    var position = this.state.position;

    // Extract the reference element
    // AKA child.first

    var children = _react2.default.Children.toArray(this.props.children);
    var reference = children[0];

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { ref: function ref(c) {
            return _this._reference = c;
          } },
        reference
      ),
      _react2.default.createElement(
        _reactPortal2.default,
        {
          ref: function ref(c) {
            return _this._portal = c;
          },
          closeOnEsc: closeOnEsc,
          openByClickOn: openByClickOn,
          onOpen: this.onOpen,
          beforeClose: beforeClose,
          onClose: this.onClose,
          onUpdate: onUpdate },
        _react2.default.createElement(
          'div',
          { ref: 'container', className: _popunder2.default.container, style: position },
          children.slice(1)
        )
      )
    );
  }
});

exports.default = Popunder;