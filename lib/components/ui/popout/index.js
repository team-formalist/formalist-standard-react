'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _popout = require('./popout.mcss');

var _popout2 = _interopRequireDefault(_popout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arrowVertPosition = 16;

/**
 * A "popout" component. Creates a element that pops over the passed
 * `reference` element.
 *
 * The reference element is the node that the popout takes its position from
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
 * @method openPopout
 * @method closePopout
 * @method getContainer
 */
var Popout = _react2.default.createClass({
  displayName: 'Popout',

  propTypes: {
    beforeClose: _react2.default.PropTypes.func,
    children: _react2.default.PropTypes.node,
    closeOnEsc: _react2.default.PropTypes.bool,
    closeOnOutsideClick: _react2.default.PropTypes.bool,
    isOpened: _react2.default.PropTypes.bool,
    offset: _react2.default.PropTypes.shape({
      default: _react2.default.PropTypes.number,
      vert: _react2.default.PropTypes.number,
      horz: _react2.default.PropTypes.number
    }),
    onOpen: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func,
    onUpdate: _react2.default.PropTypes.func,
    placement: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placement: 'right',
      offset: {
        default: 10
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      isOpened: this.props.isOpened || false,
      position: {
        left: 0,
        top: 0
      }
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.isOpened != null) {
      this.setState({
        isOpened: nextProps.isOpened
      });
      window.requestAnimationFrame(this.calculatePosition);
    }
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
   * Public interface: Calculate the position of the popout wrapper
   * @return {Object} Updated position we're setting
   */
  calculatePosition: function calculatePosition() {
    // Only bother if its rendered
    if (!this._reference) {
      return;
    }

    var position = void 0;
    var placement = this.props.placement;

    var referenceEl = this._reference.firstChild || this._reference;
    var referencePosition = referenceEl.getBoundingClientRect();
    var scrollX = window.scrollX;
    var scrollY = window.scrollY;
    var horzOffset = this.props.offset.horz;
    var vertOffset = this.props.offset.vert;
    if (placement === 'left') {
      horzOffset = horzOffset || this.props.offset.default;
      vertOffset = vertOffset || 0;
      position = {
        left: Math.round(referencePosition.left + scrollX - horzOffset),
        top: Math.round(referencePosition.top + scrollY + vertOffset + (referencePosition.height / 2 - arrowVertPosition))
      };
    } else if (placement === 'right') {
      horzOffset = horzOffset || this.props.offset.default;
      vertOffset = vertOffset || 0;
      position = {
        left: Math.round(referencePosition.left + scrollX + referencePosition.width + horzOffset),
        top: Math.round(referencePosition.top + scrollY + vertOffset + (referencePosition.height / 2 - arrowVertPosition))
      };
    } else if (placement === 'top') {
      horzOffset = horzOffset || 0;
      vertOffset = vertOffset || this.props.offset.default;
      position = {
        left: Math.round(referencePosition.left + scrollX + referencePosition.width / 2 + horzOffset),
        top: Math.round(referencePosition.top + scrollY - vertOffset)
      };
    } else if (placement === 'bottom') {
      horzOffset = horzOffset || 0;
      vertOffset = vertOffset || this.props.offset.default;
      position = {
        left: Math.round(referencePosition.left + scrollX + referencePosition.width / 2 + horzOffset),
        top: Math.round(referencePosition.top + scrollY + referencePosition.height + vertOffset)
      };
    }

    this.setState({
      position: position
    });
    return position;
  },


  /**
   * Public interface: Opens the `Portal`
   */
  openPopout: function openPopout() {
    this.calculatePosition();
    this.setState({
      isOpened: true
    });
  },


  /**
   * Public: Close the `Portal`
   */
  closePopout: function closePopout() {
    this.setState({
      isOpened: false
    });
  },


  /**
   * Public: Toggle the `Portal`
   */
  togglePopout: function togglePopout() {
    this.isOpened ? this.closePopout() : this.openPopout();
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
    var referenceEl = (0, _reactDom.findDOMNode)(this._reference);

    if (portalEl && portalEl.contains(e.target) || referenceEl && referenceEl.contains(e.target)) {
      return;
    }

    e.stopPropagation();
    this.closePopout();
  },


  /**
   * Close portal if escape is pressed
   * @param  {KeyboardEvent} e
   */
  handleKeydown: function handleKeydown(e) {
    var closeOnEsc = this.props.closeOnEsc;
    // ESCAPE = 27

    if (closeOnEsc && e.keyCode === 27 && this.state.isOpened) {
      this.closePopout();
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
    var onUpdate = _props.onUpdate;
    var placement = this.props.placement;
    var _state = this.state;
    var isOpened = _state.isOpened;
    var position = _state.position;

    // Extract the reference element
    // AKA child.first

    var children = _react2.default.Children.toArray(this.props.children);
    var reference = children[0];

    var containerClassNames = (0, _classnames2.default)(_popout2.default.container, ['' + _popout2.default['container--' + placement]]);
    var arrowClassNames = (0, _classnames2.default)(_popout2.default.containerArrow, ['' + _popout2.default['containerArrow--' + placement]]);

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
          beforeClose: beforeClose,
          isOpened: isOpened,
          onOpen: this.onOpen,
          onClose: this.onClose,
          onUpdate: onUpdate },
        _react2.default.createElement(
          'div',
          { className: _popout2.default.positioner, style: position },
          _react2.default.createElement('div', { className: arrowClassNames }),
          _react2.default.createElement(
            'div',
            { ref: function ref(c) {
                return _this._container = c;
              }, className: containerClassNames },
            children.slice(1)
          )
        )
      )
    );
  }
});

exports.default = Popout;