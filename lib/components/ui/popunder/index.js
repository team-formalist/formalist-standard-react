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
      isOpened: false,
      position: {
        left: 0,
        top: 0
      }
    };
  },
  componentDidMount: function componentDidMount() {
    this.calculatePosition();
  },
  componentWillMount: function componentWillMount() {
    window.addEventListener('resize', this.onResize);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  },


  /**
   * Public interface: Calculate the position of the popunder wrapper
   * @return {Object} Updated position we're setting
   */
  calculatePosition: function calculatePosition() {
    // Only bother if its rendered
    var referencePosition = this.refs.reference.getBoundingClientRect();
    var position = {
      left: referencePosition.left + this.props.offset.left,
      top: referencePosition.top + referencePosition.height + this.props.offset.top
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
    this.setState({
      isOpened: !this.state.isOpened
    });
  },


  /**
   * Return the `container` node
   */
  getContainer: function getContainer() {
    return this.refs.container;
  },
  onResize: function onResize(e) {
    this.calculatePosition();
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
    var _state = this.state;
    var isOpened = _state.isOpened;
    var position = _state.position;

    // Extract the reference element
    // AKA child.first

    var children = _react2.default.Children.toArray(this.props.children);
    var reference = children[0];

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { ref: 'reference' },
        reference
      ),
      _react2.default.createElement(
        _reactPortal2.default,
        {
          ref: 'portal',
          isOpened: isOpened,
          closeOnEsc: closeOnEsc,
          closeOnOutsideClick: closeOnOutsideClick,
          openByClickOn: openByClickOn,
          onOpen: onOpen,
          beforeClose: beforeClose,
          onClose: onClose,
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