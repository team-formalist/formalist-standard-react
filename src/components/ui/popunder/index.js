import React from 'react'
import Portal from 'react-portal'
import styles from './popunder.mcss'
import classNames from 'classnames'

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
  propTypes: {
    beforeClose: React.PropTypes.func,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    closeOnEsc: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    offset: React.PropTypes.shape({
      left: React.PropTypes.number,
      top: React.PropTypes.number,
    }),
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    containerClassName: React.PropTypes.string,
  },

  getDefaultProps () {
    return {
      offset: {
        left: 0,
        top: 0,
      },
    }
  },

  getInitialState () {
    return {
      isOpened: false,
      position: {
        left: 0,
        top: 0,
      },
    }
  },

  componentDidMount () {
    window.requestAnimationFrame(this.calculatePosition)
  },

  componentWillMount () {
    const {closeOnOutsideClick} = this.props
    window.addEventListener('resize', this.onResize)
    document.addEventListener('keydown', this.handleKeydown)
    if (closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick)
      document.addEventListener('touchstart', this.handleOutsideMouseClick)
    }
  },

  componentWillUnmount () {
    const {closeOnOutsideClick} = this.props
    document.removeEventListener('resize', this.onResize)
    document.removeEventListener('keydown', this.handleKeydown)
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
      top: referencePosition.top + scrollY + referencePosition.height + this.props.offset.top,
    }
    this.setState({
      position,
    })
    return position
  },

  /**
   * Public interface: Opens the `Portal`
   */
  openPopunder () {
    this.calculatePosition()
    this.setState({
      isOpened: true,
    })
  },

  /**
   * Public: Close the `Portal`
   */
  closePopunder () {
    this.setState({
      isOpened: false,
    })
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
    if (!this.state.isOpened) {
      return
    }

    // Extract the elements based on `ref` values. The actual portal element is
    // nested within the react-portal instance as it gets rendered out of
    // context
    const portalEl = this._portal.portal
    const referenceEl = this._reference

    if ((portalEl && portalEl.contains(e.target)) || (referenceEl && referenceEl.contains(e.target))) {
      return
    }

    e.stopPropagation()
    this.closePopunder()
  },

  /**
   * Close portal if escape is pressed
   * @param  {KeyboardEvent} e
   */
  handleKeydown (e) {
    const {closeOnEsc} = this.props
    // ESCAPE = 27
    if (closeOnEsc && e.keyCode === 27 && this.state.isOpened) {
      this.closePopunder()
    }
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
    const {onOpen} = this.props
    if (onOpen) {
      onOpen()
    }
  },

  /**
   * Keep track of open/close state
   */
  onClose () {
    const {onClose} = this.props
    if (onClose) {
      onClose()
    }
  },

  render () {
    // Extract Portal props
    let {
      beforeClose,
      className,
      onUpdate,
      containerClassName,
    } = this.props

    let {isOpened, position} = this.state

    // Extract the reference element
    // AKA child.first
    let children = React.Children.toArray(this.props.children)
    let reference = children[0]
    let portalContent = children.slice(1)

    const containerClassNames = classNames(
      styles.container,
      containerClassName
    )

    return (
      <div className={className}>
        <div ref={(c) => { this._reference = c }}>
          {reference}
        </div>
        <Portal
          ref={(c) => { this._portal = c }}
          beforeClose={beforeClose}
          isOpened={isOpened}
          onOpen={this.onOpen}
          onClose={this.onClose}
          onUpdate={onUpdate}>
          <div
            ref={(c) => { this._container = c }}
            className={containerClassNames}
            style={position}
          >
            {portalContent}
          </div>
        </Portal>
      </div>
    )
  },
})

export default Popunder
