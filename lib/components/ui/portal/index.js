var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import ReactDOM from "react-dom";
import { Component } from "react";
import PropTypes from "prop-types";

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
      var _props = this.props,
          beforeClose = _props.beforeClose,
          isOpened = _props.isOpened;

      if (!willOpened && isOpened) {
        beforeClose();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var wasOpened = prevProps.isOpened;
      var _props2 = this.props,
          isOpened = _props2.isOpened,
          onClose = _props2.onClose,
          onOpen = _props2.onOpen,
          onUpdate = _props2.onUpdate;
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
        container.setAttribute("data-portal", "");
        document.body.appendChild(container);
      }
      return container;
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          children = _props3.children,
          isOpened = _props3.isOpened;

      return isOpened && ReactDOM.createPortal(children, this.getContainer());
    }
  }]);

  return Portal;
}(Component);

Portal.propTypes = {
  beforeClose: PropTypes.func,
  children: PropTypes.node,
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onUpdate: PropTypes.func
};
Portal.defaultProps = {
  isOpened: false,
  beforeClose: function beforeClose() {},
  onClose: function onClose() {},
  onOpen: function onOpen() {},
  onUpdate: function onUpdate() {}
};


export default Portal;