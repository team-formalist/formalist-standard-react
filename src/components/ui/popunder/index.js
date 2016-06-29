import React from 'react'
import {findDOMNode} from 'react-dom'
import Portal from 'react-portal'
import styles from './popunder.mcss'

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
const Popunder = React.createClass({
  isOpened: false,

  propTypes: {
    beforeClose: React.PropTypes.func,
    children: React.PropTypes.node,
    closeOnEsc: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    offset: React.PropTypes.shape({
      left: React.PropTypes.number,
      top: React.PropTypes.number
    }),
    openByClickOn: React.PropTypes.node,
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
    onUpdate: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      offset: {
        left: 0,
        top: 0
      }
    }
  },

  getInitialState () {
    return {
      position: {
        left: 0,
        top: 0
      }
    }
  },

  componentDidMount () {
    window.requestAnimationFrame(this.calculatePosition)
  },

  componentWillMount () {
    const {closeOnOutsideClick} = this.props
    document.addEventListener('resize', this.onResize)
    if (closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick)
      document.addEventListener('touchstart', this.handleOutsideMouseClick)
    }
  },

  componentWillUnmount () {
    const {closeOnOutsideClick} = this.props
    document.removeEventListener('resize', this.onResize)
    if (closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick)
      document.removeEventListener('touchstart', this.handleOutsideMouseClick)
    }
  },

  /**
   * Public interface: Calculate the position of the popunder wrapper
   * @return {Object} Updated position we're setting
   */
  calculatePosition () {
    // Only bother if its rendered
    const referencePosition = this._reference.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    let position = {
      left: referencePosition.left + scrollX + this.props.offset.left,
      top: referencePosition.top + scrollY + referencePosition.height + this.props.offset.top
    }
    this.setState({
      position
    })
    return position
  },

  /**
   * Public interface: Opens the `Portal`
   */
  openPopunder () {
    this.calculatePosition()
    this._portal.openPortal()
  },

  /**
   * Public: Close the `Portal`
   */
  closePopunder () {
    this._portal.openPortal()
  },

  /**
   * Public: Toggle the `Portal`
   */
  togglePopunder () {
    (this.isOpened) ? this.closePopunder() : this.openPopunder()
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
    const referenceEl = findDOMNode(this._reference)

    if ((portalEl && portalEl.contains(e.target)) || (referenceEl && referenceEl.contains(e.target))) {
      return
    }

    e.stopPropagation()
    this._portal.closePortal()
  },

  /**
   * Handle position on resize
   * @param  {Event} e ResizeEvent
   */
  onResize (e) {
    this.calculatePosition()
  },

  /**
   * Keep track of open/close state
   */
  onOpen () {
    this.isOpened = true
    const {onOpen} = this.props
    if (onOpen) {
      onOpen()
    }
  },

  /**
   * Keep track of open/close state
   */
  onClose () {
    this.isOpened = false
    const {onClose} = this.props
    if (onClose) {
      onClose()
    }
  },

  render () {
    // Extract Portal props
    let {
      closeOnEsc,
      openByClickOn,
      beforeClose,
      onUpdate
    } = this.props

    let { position } = this.state

    // Extract the reference element
    // AKA child.first
    let children = React.Children.toArray(this.props.children)
    let reference = children[0]

    return (
      <div>
        <div ref={(c) => this._reference = c}>
          {reference}
        </div>
        <Portal
          ref={(c) => this._portal = c}
          closeOnEsc={closeOnEsc}
          openByClickOn={openByClickOn}
          onOpen={this.onOpen}
          beforeClose={beforeClose}
          onClose={this.onClose}
          onUpdate={onUpdate}>
          <div ref='container' className={styles.container} style={position}>
            {children.slice(1)}
          </div>
        </Portal>
      </div>
    )
  }
})

export default Popunder
