"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portal = function (_Component) {
  _inherits(Portal, _Component);

  function Portal() {
    _classCallCheck(this, Portal);

    return _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(this, arguments));
  }

  _createClass(Portal, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      var willOpened = nextProps.isOpened;
      var _props = this.props;
      var beforeClose = _props.beforeClose;
      var isOpened = _props.isOpened;

      if (!willOpened && isOpened) {
        beforeClose();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var wasOpened = prevProps.isOpened;
      var _props2 = this.props;
      var isOpened = _props2.isOpened;
      var onClose = _props2.onClose;
      var onOpen = _props2.onOpen;
      var onUpdate = _props2.onUpdate;
      // Fire callback props

      onUpdate();
      if (isOpened && !wasOpened) {
        onOpen();
      }
      if (!isOpened && wasOpened) {
        onClose();
      }
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      var containerClassName = "fsr-portal-container";
      var container = document.querySelector("." + containerClassName);
      if (!container) {
        container = document.createElement("div");
        container.classList.add(containerClassName);
        document.body.appendChild(container);
      }
      return container;
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props;
      var children = _props3.children;
      var isOpened = _props3.isOpened;

      return isOpened && _reactDom2.default.createPortal(this.props.children, this.getContainer());
    }
  }]);

  return Portal;
}(_react.Component);

Portal.propTypes = {
  beforeClose: _propTypes2.default.func,
  children: _propTypes2.default.node,
  isOpened: _propTypes2.default.bool,
  onClose: _propTypes2.default.func,
  onOpen: _propTypes2.default.func,
  onUpdate: _propTypes2.default.func
};
Portal.defaultProps = {
  isOpened: false,
  beforeClose: function beforeClose() {},
  onClose: function onClose() {},
  onOpen: function onOpen() {},
  onUpdate: function onUpdate() {}
};
exports.default = Portal;