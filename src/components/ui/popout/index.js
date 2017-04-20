import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import Portal from 'react-portal'
import styles from './popout.mcss'

const arrowVertPosition = 16

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
class Popout extends React.Component {
  static propTypes = {
    beforeClose: PropTypes.func,
    children: PropTypes.node,
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    isOpened: PropTypes.bool,
    offset: PropTypes.shape({
      default: PropTypes.number,
      vert: PropTypes.number,
      horz: PropTypes.number,
    }),
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
    placement: PropTypes.string,
  };

  static defaultProps = {
    placement: 'right',
    offset: {
      default: 10,
    },
  };

  state = {
    isOpened: this.props.isOpened || false,
    position: {
      left: 0,
      top: 0,
    },
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.isOpened != null) {
      this.setState({
        isOpened: nextProps.isOpened,
      })
      window.requestAnimationFrame(this.calculatePosition)
    }
  }

  componentDidMount () {
    window.requestAnimationFrame(this.calculatePosition)
  }

  componentWillMount () {
    const {closeOnOutsideClick} = this.props
    window.addEventListener('resize', this.onResize)
    document.addEventListener('keydown', this.handleKeydown)
    if (closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick)
      document.addEventListener('touchstart', this.handleOutsideMouseClick)
    }
  }

  componentWillUnmount () {
    const {closeOnOutsideClick} = this.props
    document.removeEventListener('resize', this.onResize)
    document.removeEventListener('keydown', this.handleKeydown)
    if (closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick)
      document.removeEventListener('touchstart', this.handleOutsideMouseClick)
    }
  }

  /**
   * Public interface: Calculate the position of the popout wrapper
   * @return {Object} Updated position we're setting
   */
  calculatePosition = () => {
    // Only bother if its rendered
    if (!this._reference) {
      return
    }

    let position
    const { placement } = this.props
    const referenceEl = this._reference.firstChild || this._reference
    const referencePosition = referenceEl.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    let horzOffset = this.props.offset.horz
    let vertOffset = this.props.offset.vert
    if (placement === 'left') {
      horzOffset = horzOffset || this.props.offset.default
      vertOffset = vertOffset || 0
      position = {
        left: Math.round(referencePosition.left + scrollX - horzOffset),
        top: Math.round(referencePosition.top + scrollY + vertOffset + (referencePosition.height / 2 - arrowVertPosition)),
      }
    } else if (placement === 'right') {
      horzOffset = horzOffset || this.props.offset.default
      vertOffset = vertOffset || 0
      position = {
        left: Math.round(referencePosition.left + scrollX + referencePosition.width + horzOffset),
        top: Math.round(referencePosition.top + scrollY + vertOffset + (referencePosition.height / 2 - arrowVertPosition)),
      }
    } else if (placement === 'top') {
      horzOffset = horzOffset || 0
      vertOffset = vertOffset || this.props.offset.default
      position = {
        left: Math.round(referencePosition.left + scrollX + (referencePosition.width / 2) + horzOffset),
        top: Math.round(referencePosition.top + scrollY - vertOffset),
      }
    } else if (placement === 'bottom') {
      horzOffset = horzOffset || 0
      vertOffset = vertOffset || this.props.offset.default
      position = {
        left: Math.round(referencePosition.left + scrollX + (referencePosition.width / 2) + horzOffset),
        top: Math.round(referencePosition.top + scrollY + referencePosition.height + vertOffset),
      }
    }

    this.setState({
      position,
    })
    return position
  };

  /**
   * Public interface: Opens the `Portal`
   */
  openPopout = () => {
    this.calculatePosition()
    this.setState({
      isOpened: true,
    })
  };

  /**
   * Public: Close the `Portal`
   */
  closePopout = () => {
    this.setState({
      isOpened: false,
    })
  };

  /**
   * Public: Toggle the `Portal`
   */
  togglePopout = () => {
    (this.isOpened) ? this.closePopout() : this.openPopout()
  };

  /**
   * Return the `container` node
   */
  getContainer = () => {
    return this._container
  };

  /**
   * Close the portal if a click-outside occurs
   * @param  {Event} e MouseUp/TouchStart event
   * @return {Null}
   */
  handleOutsideMouseClick = (e) => {
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
    this.closePopout()
  };

  /**
   * Close portal if escape is pressed
   * @param  {KeyboardEvent} e
   */
  handleKeydown = (e) => {
    const {closeOnEsc} = this.props
    // ESCAPE = 27
    if (closeOnEsc && e.keyCode === 27 && this.state.isOpened) {
      this.closePopout()
    }
  };

  /**
   * Handle position on resize
   * @param  {Event} e ResizeEvent
   */
  onResize = (e) => {
    this.calculatePosition()
  };

  /**
   * Keep track of open/close state
   */
  onOpen = () => {
    let {onOpen} = this.props
    if (onOpen) {
      onOpen()
    }
  };

  /**
   * Keep track of open/close state
   */
  onClose = () => {
    let {onClose} = this.props
    if (onClose) {
      onClose()
    }
  };

  render () {
    // Extract Portal props
    let {
      beforeClose,
      onUpdate,
    } = this.props

    let {placement} = this.props
    let {isOpened, position} = this.state

    // Extract the reference element
    // AKA child.first
    let children = React.Children.toArray(this.props.children)
    let reference = children[0]

    let containerClassNames = classNames(
      styles.container,
      [`${styles['container--' + placement]}`]
    )
    let arrowClassNames = classNames(
      styles.containerArrow,
      [`${styles['containerArrow--' + placement]}`]
    )

    return (
      <div>
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
          <div className={styles.positioner} style={position}>
            <div className={arrowClassNames} />
            <div ref={(c) => { this._container = c }} className={containerClassNames}>
              {children.slice(1)}
            </div>
          </div>
        </Portal>
      </div>
    )
  }
}

export default Popout
