var _jsxFileName = "src/components/ui/popout/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import Portal from "../portal";
import capitalize from "../../../utils/capitalize";
import * as styles from "./styles";

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

var Popout = function (_React$Component) {
  _inherits(Popout, _React$Component);

  function Popout() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Popout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popout.__proto__ || Object.getPrototypeOf(Popout)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpened: _this.props.isOpened || false,
      position: {
        left: 0,
        top: 0
      }
    }, _this.calculatePosition = function () {
      // Only bother if its rendered
      if (!_this._reference) {
        return;
      }
      var referenceEl = _this._reference.firstChild || _this._reference;

      var position = void 0;
      var placement = _this.props.placement;

      var referencePosition = referenceEl.getBoundingClientRect();
      var scrollX = window.scrollX;
      var scrollY = window.scrollY;
      var horzOffset = _this.props.offset.horz;
      var vertOffset = _this.props.offset.vert;
      if (placement === "left") {
        horzOffset = horzOffset || _this.props.offset.default;
        vertOffset = vertOffset || 0;
        position = {
          left: Math.round(referencePosition.left + scrollX - horzOffset),
          top: Math.round(referencePosition.top + scrollY + vertOffset + (referencePosition.height / 2 - arrowVertPosition))
        };
      } else if (placement === "right") {
        horzOffset = horzOffset || _this.props.offset.default;
        vertOffset = vertOffset || 0;
        position = {
          left: Math.round(referencePosition.left + scrollX + referencePosition.width + horzOffset),
          top: Math.round(referencePosition.top + scrollY + vertOffset + (referencePosition.height / 2 - arrowVertPosition))
        };
      } else if (placement === "top") {
        horzOffset = horzOffset || 0;
        vertOffset = vertOffset || _this.props.offset.default;
        position = {
          left: Math.round(referencePosition.left + scrollX + referencePosition.width / 2 + horzOffset),
          top: Math.round(referencePosition.top + scrollY - vertOffset)
        };
      } else if (placement === "bottom") {
        horzOffset = horzOffset || 0;
        vertOffset = vertOffset || _this.props.offset.default;
        position = {
          left: Math.round(referencePosition.left + scrollX + referencePosition.width / 2 + horzOffset),
          top: Math.round(referencePosition.top + scrollY + referencePosition.height + vertOffset)
        };
      }

      _this.setState({
        position: position
      });
      return position;
    }, _this.openPopout = function () {
      _this.calculatePosition();
      _this.setState({
        isOpened: true
      });
    }, _this.closePopout = function () {
      _this.setState({
        isOpened: false
      });
    }, _this.togglePopout = function () {
      _this.isOpened ? _this.closePopout() : _this.openPopout();
    }, _this.getContainer = function () {
      return _this._container;
    }, _this.handleOutsideMouseClick = function (e) {
      if (!_this.state.isOpened) {
        return;
      }

      // Extract the elements based on `ref` values. The actual portal element is
      // nested within the portal instance as it gets rendered out of
      // context
      var portalEl = _this._portal.getContainer();
      var referenceEl = _this._reference;

      if (portalEl && portalEl.contains(e.target) || referenceEl && referenceEl.contains(e.target)) {
        return;
      }

      e.stopPropagation();
      _this.closePopout();
    }, _this.handleKeydown = function (e) {
      var closeOnEsc = _this.props.closeOnEsc;
      // ESCAPE = 27

      if (closeOnEsc && e.keyCode === 27 && _this.state.isOpened) {
        _this.closePopout();
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

  _createClass(Popout, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isOpened != null) {
        this.setState({
          isOpened: nextProps.isOpened
        });
        window.requestAnimationFrame(this.calculatePosition);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.requestAnimationFrame(this.calculatePosition);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var closeOnOutsideClick = this.props.closeOnOutsideClick;

      window.addEventListener("resize", this.onResize);
      document.addEventListener("keydown", this.handleKeydown);
      if (closeOnOutsideClick) {
        document.addEventListener("mouseup", this.handleOutsideMouseClick);
        document.addEventListener("touchstart", this.handleOutsideMouseClick);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var closeOnOutsideClick = this.props.closeOnOutsideClick;

      document.removeEventListener("resize", this.onResize);
      document.removeEventListener("keydown", this.handleKeydown);
      if (closeOnOutsideClick) {
        document.removeEventListener("mouseup", this.handleOutsideMouseClick);
        document.removeEventListener("touchstart", this.handleOutsideMouseClick);
      }
    }

    /**
     * Public interface: Calculate the position of the popout wrapper
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
    key: "render",
    value: function render() {
      var _this2 = this;

      // Extract Portal props
      var _props = this.props,
          beforeClose = _props.beforeClose,
          onUpdate = _props.onUpdate,
          testId = _props.testId;
      var placement = this.props.placement;
      var _state = this.state,
          isOpened = _state.isOpened,
          position = _state.position;

      // Extract the reference element
      // AKA child.first

      var children = React.Children.toArray(this.props.children);
      var reference = children[0];

      var containerClassNames = classNames(styles.container, ["" + styles["container" + capitalize(placement)]]);
      var arrowClassNames = classNames(styles.containerArrow, ["" + styles["containerArrow" + capitalize(placement)]]);

      return React.createElement(
        "div",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 302
          },
          __self: this
        },
        React.createElement(
          "div",
          {
            ref: function ref(c) {
              _this2._reference = c;
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 303
            },
            __self: this
          },
          reference
        ),
        React.createElement(
          Portal,
          {
            ref: function ref(c) {
              _this2._portal = c;
            },
            beforeClose: beforeClose,
            isOpened: isOpened,
            onOpen: this.onOpen,
            onClose: this.onClose,
            onUpdate: onUpdate,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 310
            },
            __self: this
          },
          React.createElement(
            "div",
            {
              "data-testid": testId,
              className: styles.positioner,
              style: position,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 320
              },
              __self: this
            },
            React.createElement("div", { className: arrowClassNames, __source: {
                fileName: _jsxFileName,
                lineNumber: 325
              },
              __self: this
            }),
            React.createElement(
              "div",
              {
                ref: function ref(c) {
                  _this2._container = c;
                },
                className: containerClassNames,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 326
                },
                __self: this
              },
              children.slice(1)
            )
          )
        )
      );
    }
  }]);

  return Popout;
}(React.Component);

Popout.propTypes = {
  beforeClose: PropTypes.func,
  children: PropTypes.node,
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  isOpened: PropTypes.bool,
  offset: PropTypes.shape({
    default: PropTypes.number,
    vert: PropTypes.number,
    horz: PropTypes.number
  }),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
  placement: PropTypes.string,
  testId: PropTypes.string
};
Popout.defaultProps = {
  placement: "right",
  offset: {
    default: 10
  }
};


export default Popout;