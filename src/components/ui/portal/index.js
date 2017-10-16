import ReactDOM from "react-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";

class Portal extends Component {
  static propTypes = {
    beforeClose: PropTypes.func,
    children: PropTypes.node,
    isOpened: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onUpdate: PropTypes.func
  };

  static defaultProps = {
    isOpened: false,
    beforeClose: function beforeClose() {},
    onClose: function onClose() {},
    onOpen: function onOpen() {},
    onUpdate: function onUpdate() {}
  };

  componentWillUpdate(nextProps) {
    const willOpened = nextProps.isOpened;
    const { beforeClose, isOpened } = this.props;
    if (!willOpened && isOpened) {
      beforeClose();
    }
  }

  componentDidUpdate(prevProps) {
    const wasOpened = prevProps.isOpened;
    const { isOpened, onClose, onOpen, onUpdate } = this.props;
    // Fire callback props
    onUpdate();
    if (isOpened && !wasOpened) {
      onOpen();
    }
    if (!isOpened && wasOpened) {
      onClose();
    }
  }

  getContainer() {
    const containerClassName = "fsr-portal-container";
    let container = document.querySelector(`.${containerClassName}`);
    if (!container) {
      container = document.createElement("div");
      container.classList.add(containerClassName);
      document.body.appendChild(container);
    }
    return container;
  }

  render() {
    const { children, isOpened } = this.props;
    return (
      isOpened &&
      ReactDOM.createPortal(this.props.children, this.getContainer())
    );
  }
}

export default Portal;
