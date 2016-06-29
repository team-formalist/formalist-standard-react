import React from 'react'
import {findDOMNode} from 'react-dom'
import Portal from 'react-portal'
import styles from './modal.mcss'

/**
 * A 'modal' component.
 *
 * Exposes:
 *
 * @method openModal
 * @method closeModal
 * @method getContainer
 */
const Modal = React.createClass({
  isOpened: false,

  propTypes: {
    beforeClose: React.PropTypes.func,
    children: React.PropTypes.node,
    closeOnEsc: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    openByClickOn: React.PropTypes.node,
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
    onUpdate: React.PropTypes.func
  },

  componentWillMount () {
    const {closeOnOutsideClick} = this.props
    if (closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick)
      document.addEventListener('touchstart', this.handleOutsideMouseClick)
    }
  },

  componentWillUnmount () {
    const {closeOnOutsideClick} = this.props
    if (closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick)
      document.removeEventListener('touchstart', this.handleOutsideMouseClick)
    }
  },

  /**
   * Public interface: Opens the `Portal`
   */
  openModal () {
    this._portal.openPortal()
  },

  /**
   * Public: Close the `Portal`
   */
  closeModal () {
    this._portal.closePortal()
  },

  /**
   * Public: Toggle the `Portal`
   */
  toggleModal () {
    (this.isOpened) ? this.closeModal() : this.openModal()
  },

  /**
   * Return the `container` node
   */
  getContainer () {
    return this._container
  },

  /**
   * Close the portal if a click-outside occurs
   * @param  {Event} e MouseUp/TouchStart event
   * @return {Null}
   */
  handleOutsideMouseClick (e) {
    if (!this.isOpened) {
      return
    }

    // Extract the elements based on `ref` values. The actual portal element is
    // nested within the react-portal instance as it gets rendered out of
    // context
    const portalEl = findDOMNode(this._portal.portal)
    const containerEl = findDOMNode(this._container)

    if ((portalEl && portalEl.contains(e.target)) || (containerEl && containerEl.contains(e.target))) {
      return
    }

    e.stopPropagation()
    this._portal.closePortal()
  },

  onOpen (portalEl) {
    this.isOpened = true
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.left = '0'
    document.body.style.right = '0'
    if (this.props.onOpen) {
      this.props.onOpen(portalEl)
    }
  },

  onClose (portalEl) {
    this.isOpened = false
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.left = ''
    document.body.style.right = ''
    if (this.props.onClose) {
      this.props.onClose(portalEl)
    }
  },

  onCloseClick (e) {
    e.preventDefault()
    this.closeModal()
  },

  onOverlayClick (e) {
    e.preventDefault()
    this.closeModal()
  },

  render () {
    // Extract Portal props
    const {
      closeOnEsc,
      openByClickOn,
      beforeClose,
      onUpdate
    } = this.props

    return (
      <Portal
        ref={(c) => this._portal = c}
        closeOnEsc={closeOnEsc}
        openByClickOn={openByClickOn}
        onOpen={this.onOpen}
        beforeClose={beforeClose}
        onClose={this.onClose}
        onUpdate={onUpdate}>
        <div ref={(c) => this._container = c} className={styles.container}>
          <button className={styles.close} onClick={this.onCloseClick}>
            <span className={styles.closeText}>Close</span>
            <div className={styles.closeX}>&times;</div>
          </button>
          <button className={styles.overlay} onClick={this.onOverlayClick} />
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </Portal>
    )
  }
})

export default Modal
