'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _popunder = require('./popunder.mcss');

var _popunder2 = _interopRequireDefault(_popunder);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var Popunder = function (_React$Component) {
  _inherits(Popunder, _React$Component);

  function Popunder() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Popunder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popunder.__proto__ || Object.getPrototypeOf(Popunder)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpened: false,
      position: {
        left: 0,
        top: 0
      }
    }, _this.calculatePosition = function () {
      // Only bother if its rendered
      var referencePosition = _this._reference.getBoundingClientRect();
      var scrollX = window.scrollX;
      var scrollY = window.scrollY;
      var position = {
        left: referencePosition.left + scrollX + _this.props.offset.left,
        top: referencePosition.top + scrollY + referencePosition.height + _this.props.offset.top
      };
      _this.setState({
        position: position
      });
      return position;
    }, _this.openPopunder = function () {
      _this.calculatePosition();
      _this.setState({
        isOpened: true
      });
    }, _this.closePopunder = function () {
      _this.setState({
        isOpened: false
      });
    }, _this.togglePopunder = function () {
      _this.isOpened ? _this.closePopunder() : _this.openPopunder();
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
      var referenceEl = _this._reference;

      if (portalEl && portalEl.contains(e.target) || referenceEl && referenceEl.contains(e.target)) {
        return;
      }

      e.stopPropagation();
      _this.closePopunder();
    }, _this.handleKeydown = function (e) {
      var closeOnEsc = _this.props.closeOnEsc;
      // ESCAPE = 27

      if (closeOnEsc && e.keyCode === 27 && _this.state.isOpened) {
        _this.closePopunder();
      }
    }, _this.onResize = function (e) {
      _this.calculatePosition();
    }, _this.onOpen = function () {
      var onOpen = _this.props.onOpen;

      if (onOpen) {
        onOpen();
      }
    }, _this.onClose = function () {
      var onClose = _this.props.onClose;

      if (onClose) {
        onClose();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Popunder, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.requestAnimationFrame(this.calculatePosition);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var closeOnOutsideClick = this.props.closeOnOutsideClick;

      window.addEventListener('resize', this.onResize);
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

      document.removeEventListener('resize', this.onResize);
      document.removeEventListener('keydown', this.handleKeydown);
      if (closeOnOutsideClick) {
        document.removeEventListener('mouseup', this.handleOutsideMouseClick);
        document.removeEventListener('touchstart', this.handleOutsideMouseClick);
      }
    }

    /**
     * Public interface: Calculate the position of the popunder wrapper
     * @return {Object} Updated position we're setting
     */


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


    /**
     * Handle position on resize
     * @param  {Event} e ResizeEvent
     */


    /**
     * Keep track of open/close state
     */


    /**
     * Keep track of open/close state
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

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
              _this2._reference = c;
            } },
          reference
        ),
        _react2.default.createElement(
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
            {
              ref: function ref(c) {
                _this2._container = c;
              },
              className: containerClassNames,
              style: position
            },
            portalContent
          )
        )
      );
    }
  }]);

  return Popunder;
}(_react2.default.Component);

Popunder.propTypes = {
  beforeClose: _propTypes2.default.func,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  closeOnEsc: _propTypes2.default.bool,
  closeOnOutsideClick: _propTypes2.default.bool,
  offset: _propTypes2.default.shape({
    left: _propTypes2.default.number,
    top: _propTypes2.default.number
  }),
  onOpen: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  onUpdate: _propTypes2.default.func,
  containerClassName: _propTypes2.default.string
};
Popunder.defaultProps = {
  offset: {
    left: 0,
    top: 0
  }
};
exports.default = Popunder;