'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _popunder = require('./popunder.mcss');

var _popunder2 = _interopRequireDefault(_popunder);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

  propTypes: {
    beforeClose: _react2.default.PropTypes.func,
    children: _react2.default.PropTypes.node,
    className: _react2.default.PropTypes.string,
    closeOnEsc: _react2.default.PropTypes.bool,
    closeOnOutsideClick: _react2.default.PropTypes.bool,
    offset: _react2.default.PropTypes.shape({
      left: _react2.default.PropTypes.number,
      top: _react2.default.PropTypes.number
    }),
    onOpen: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func,
    onUpdate: _react2.default.PropTypes.func,
    containerClassName: _react2.default.PropTypes.string
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
      isOpened: false,
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

    window.addEventListener('resize', this.onResize);
    document.addEventListener('keydown', this.handleKeydown);
    if (closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    var closeOnOutsideClick = this.props.closeOnOutsideClick;

    document.removeEventListener('resize', this.onResize);
    document.removeEventListener('keydown', this.handleKeydown);
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
    this.setState({
      isOpened: true
    });
  },


  /**
   * Public: Close the `Portal`
   */
  closePopunder: function closePopunder() {
    this.setState({
      isOpened: false
    });
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
    if (!this.state.isOpened) {
      return;
    }

    // Extract the elements based on `ref` values. The actual portal element is
    // nested within the react-portal instance as it gets rendered out of
    // context
    var portalEl = this._portal.portal;
    var referenceEl = this._reference;

    if (portalEl && portalEl.contains(e.target) || referenceEl && referenceEl.contains(e.target)) {
      return;
    }

    e.stopPropagation();
    this.closePopunder();
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
    var onOpen = this.props.onOpen;

    if (onOpen) {
      onOpen();
    }
  },


  /**
   * Keep track of open/close state
   */
  onClose: function onClose() {
    var onClose = this.props.onClose;

    if (onClose) {
      onClose();
    }
  },
  render: function render() {
    var _this = this;

    // Extract Portal props
    var _props = this.props;
    var beforeClose = _props.beforeClose;
    var className = _props.className;
    var onUpdate = _props.onUpdate;
    var containerClassName = _props.containerClassName;
    var _state = this.state;
    var isOpened = _state.isOpened;
    var position = _state.position;

    // Extract the reference element
    // AKA child.first

    var children = _react2.default.Children.toArray(this.props.children);
    var reference = children[0];
    var portalContent = children.slice(1);

    var containerClassNames = (0, _classnames2.default)(_popunder2.default.container, containerClassName);

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { ref: function ref(c) {
            _this._reference = c;
          } },
        reference
      ),
      _react2.default.createElement(
        _reactPortal2.default,
        {
          ref: function ref(c) {
            _this._portal = c;
          },
          beforeClose: beforeClose,
          isOpened: isOpened,
          onOpen: this.onOpen,
          onClose: this.onClose,
          onUpdate: onUpdate },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(c) {
              _this._container = c;
            },
            className: containerClassNames,
            style: position
          },
          portalContent
        )
      )
    );
  }
});

exports.default = Popunder;