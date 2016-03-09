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
    let { onOpen } = this.props
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.left = '0'
    document.body.style.right = '0'
    if (onOpen) {
      onOpen(portalEl)
    }
  },

  onClose (portalEl) {
    let { onClose } = this.props
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.left = ''
    document.body.style.right = ''
    if (onClose) {
      onClose(portalEl)
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
      beforeClose,
      children,
      closeOnEsc,
      closeOnOutsideClick,
      onClose,
      onOpen,
      onUpdate,
      openByClickOn
    } = this.props

    return (
      <Portal
        ref='portal'
        closeOnEsc={ closeOnEsc }
        closeOnOutsideClick={ closeOnOutsideClick }
        openByClickOn={ openByClickOn }
        onOpen={ onOpen }
        beforeClose={ beforeClose }
        onClose={ onClose }
        onUpdate={ onUpdate }>
        <div ref='container' className={ styles.container }>
          <button className={ styles.close } onClick={ this.onCloseClick }>
            <span className={ styles.closeText }>Close</span>
            <div className={ styles.closeX }>&times;</div>
          </button>
          <button className={ styles.overlay } onClick={ this.onOverlayClick }/>
          <div className={ styles.content }>
            { children }
          </div>
        </div>
      </Portal>
    )
  }
})

export default Modal
