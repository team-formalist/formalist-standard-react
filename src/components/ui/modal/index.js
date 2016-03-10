import React from 'react'
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

  /**
   * Public interface: Opens the `Portal`
   */
  openModal () {
    return this.refs.portal.openPortal()
  },

  /**
   * Public: Close the `Portal`
   */
  closeModal () {
    return this.refs.portal.closePortal()
  },

  /**
   * Return the `container` node
   */
  getContainer () {
    return this.refs.container
  },

  onOpen (portalEl) {
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.left = '0'
    document.body.style.right = '0'
    if (this.props.onOpen) {
      this.props.onOpen(portalEl)
    }
  },

  onClose (portalEl) {
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
    let {
      closeOnEsc,
      closeOnOutsideClick,
      openByClickOn,
      beforeClose,
      onUpdate
    } = this.props

    return (
      <Portal
        ref='portal'
        closeOnEsc={closeOnEsc}
        closeOnOutsideClick={closeOnOutsideClick}
        openByClickOn={openByClickOn}
        onOpen={this.onOpen}
        beforeClose={beforeClose}
        onClose={this.onClose}
        onUpdate={onUpdate}>
        <div ref='container' className={styles.container}>
          <button className={styles.close} onClick={this.onCloseClick}>
            <span className={styles.closeText}>Close</span>
            <div className={styles.closeX}>&times;</div>
          </button>
          <button className={styles.overlay} onClick={this.onOverlayClick}/>
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </Portal>
    )
  }
})

export default Modal
