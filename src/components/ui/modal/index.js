import React from "react";
import PropTypes from "prop-types";
import Portal from "../portal";
import * as styles from "./styles";

/**
 * A 'modal' component.
 *
 * Exposes:
 *
 * @method openModal
 * @method closeModal
 * @method getContainer
 */
class Modal extends React.Component {
  static propTypes = {
    beforeClose: PropTypes.func,
    children: PropTypes.node,
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func
  };

  state = {
    isOpened: false
  };

  componentWillMount() {
    const { closeOnOutsideClick } = this.props;
    document.addEventListener("keydown", this.handleKeydown);
    if (closeOnOutsideClick) {
      document.addEventListener("mouseup", this.handleOutsideMouseClick);
      document.addEventListener("touchstart", this.handleOutsideMouseClick);
    }
  }

  componentWillUnmount() {
    const { closeOnOutsideClick } = this.props;
    document.removeEventListener("keydown", this.handleKeydown);
    if (closeOnOutsideClick) {
      document.removeEventListener("mouseup", this.handleOutsideMouseClick);
      document.removeEventListener("touchstart", this.handleOutsideMouseClick);
    }
  }

  /**
   * Public interface: Opens the `Portal`
   */
  openModal = () => {
    this.setState({
      isOpened: true
    });
  };

  /**
   * Public: Close the `Portal`
   */
  closeModal = () => {
    this.setState({
      isOpened: false
    });
  };

  /**
   * Public: Toggle the `Portal`
   */
  toggleModal = () => {
    this.isOpened ? this.closeModal() : this.openModal();
  };

  /**
   * Return the `container` node
   */
  getContainer = () => {
    return this._container;
  };

  /**
   * Close the portal if a click-outside occurs
   * @param  {Event} e MouseUp/TouchStart event
   * @return {Null}
   */
  handleOutsideMouseClick = e => {
    if (!this.state.isOpened) {
      return;
    }

    // Extract the elements based on `ref` values. The actual portal element is
    // nested within the portal instance as it gets rendered out of
    // context
    const portalEl = this._portal.getContainer();
    const containerEl = this._container;

    if (
      (portalEl && portalEl.contains(e.target)) ||
      (containerEl && containerEl.contains(e.target))
    ) {
      return;
    }

    e.stopPropagation();
    this.closeModal();
  };

  /**
   * Close portal if escape is pressed
   * @param  {KeyboardEvent} e
   */
  handleKeydown = e => {
    const { closeOnEsc } = this.props;
    // ESCAPE = 27
    if (closeOnEsc && e.keyCode === 27 && this.state.isOpened) {
      this.closeModal();
    }
  };

  onOpen = portalEl => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.left = "0";
    document.body.style.right = "0";
    if (this.props.onOpen) {
      this.props.onOpen(portalEl);
    }
  };

  onClose = portalEl => {
    this.isOpened = false;
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.left = "";
    document.body.style.right = "";
    if (this.props.onClose) {
      this.props.onClose(portalEl);
    }
  };

  onCloseClick = e => {
    e.preventDefault();
    this.closeModal();
  };

  onOverlayClick = e => {
    e.preventDefault();
    this.closeModal();
  };

  render() {
    // Extract Portal props
    const { beforeClose, onUpdate } = this.props;
    const { isOpened } = this.state;

    return (
      <Portal
        ref={c => {
          this._portal = c;
        }}
        beforeClose={beforeClose}
        isOpened={isOpened}
        onOpen={this.onOpen}
        onClose={this.onClose}
        onUpdate={onUpdate}
      >
        <div
          ref={c => {
            this._container = c;
          }}
          className={styles.container}
        >
          <button className={styles.close} onClick={this.onCloseClick}>
            <span className={styles.closeText}>Close</span>
            <div className={styles.closeX}>×</div>
          </button>
          <button className={styles.overlay} onClick={this.onOverlayClick} />
          <div className={styles.content}>{this.props.children}</div>
        </div>
      </Portal>
    );
  }
}

export default Modal;
