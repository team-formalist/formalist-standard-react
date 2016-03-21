'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
    offset: _react2.default.PropTypes.shape({
      default: _react2.default.PropTypes.number,
      vert: _react2.default.PropTypes.number,
      horz: _react2.default.PropTypes.number
    }),
    openByClickOn: _react2.default.PropTypes.node,
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
      position: {
        left: 0,
        top: 0
      }
    };
  },
  componentDidMount: function componentDidMount() {
    requestAnimationFrame(this.calculatePosition);
  },
  componentWillMount: function componentWillMount() {
    window.addEventListener('resize', this.onResize);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  },


  /**
   * Public interface: Calculate the position of the popout wrapper
   * @return {Object} Updated position we're setting
   */
  calculatePosition: function calculatePosition() {
    // Only bother if its rendered
    var position = undefined;
    var placement = this.props.placement;

    var referencePosition = this.refs.reference.getBoundingClientRect();
    var scrollX = window.scrollX;
    var scrollY = window.scrollY;
    var horzOffset = this.props.offset.horz;
    var vertOffset = this.props.offset.vert;
    if (placement === 'left') {
      horzOffset = horzOffset || this.props.offset.default;
      vertOffset = vertOffset || 0;
      position = {
        left: referencePosition.left + scrollX - horzOffset,
        top: referencePosition.top + scrollY + vertOffset + (referencePosition.height / 2 - arrowVertPosition)
      };
    } else if (placement === 'right') {
      horzOffset = horzOffset || this.props.offset.default;
      vertOffset = vertOffset || 0;
      position = {
        left: referencePosition.left + scrollX + referencePosition.width + horzOffset,
        top: referencePosition.top + scrollY + vertOffset + (referencePosition.height / 2 - arrowVertPosition)
      };
    } else if (placement === 'top') {
      horzOffset = horzOffset || 0;
      vertOffset = vertOffset || this.props.offset.default;
      position = {
        left: referencePosition.left + scrollX + referencePosition.width / 2 + horzOffset,
        top: referencePosition.top + scrollY - vertOffset
      };
    } else if (placement === 'bottom') {
      horzOffset = horzOffset || 0;
      vertOffset = vertOffset || this.props.offset.default;
      position = {
        left: referencePosition.left + scrollX + referencePosition.width / 2 + horzOffset,
        top: referencePosition.top + scrollY + referencePosition.height + vertOffset
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
          { className: _popout2.default.positioner, style: position },
          _react2.default.createElement('div', { className: arrowClassNames }),
          _react2.default.createElement(
            'div',
            { ref: 'container', className: containerClassNames },
            children.slice(1)
          )
        )
      )
    );
  }
});

exports.default = Popout;