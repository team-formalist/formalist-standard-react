import classNames from 'classnames'
import React from 'react'
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
const Popout = React.createClass({

  propTypes: {
    beforeClose: React.PropTypes.func,
    children: React.PropTypes.node,
    closeOnEsc: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    offset: React.PropTypes.shape({
      default: React.PropTypes.number,
      vert: React.PropTypes.number,
      horz: React.PropTypes.number
    }),
    openByClickOn: React.PropTypes.node,
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    placement: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      placement: 'right',
      offset: {
        default: 10
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
    requestAnimationFrame(this.calculatePosition)
  },

  componentWillMount () {
    window.addEventListener('resize', this.onResize)
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  },

  /**
   * Public interface: Calculate the position of the popout wrapper
   * @return {Object} Updated position we're setting
   */
  calculatePosition () {
    // Only bother if its rendered
    let position
    const { placement } = this.props
    const referencePosition = this.refs.reference.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    let horzOffset = this.props.offset.horz
    let vertOffset = this.props.offset.vert
    if (placement === 'left') {
      horzOffset = horzOffset || this.props.offset.default
      vertOffset = vertOffset || 0
      position = {
        left: referencePosition.left + scrollX - horzOffset,
        top: referencePosition.top + scrollY + vertOffset + (referencePosition.height / 2 - arrowVertPosition)
      }
    } else if (placement === 'right') {
      horzOffset = horzOffset || this.props.offset.default
      vertOffset = vertOffset || 0
      position = {
        left: referencePosition.left + scrollX + referencePosition.width + horzOffset,
        top: referencePosition.top + scrollY + vertOffset + (referencePosition.height / 2 - arrowVertPosition)
      }
    } else if (placement === 'top') {
      horzOffset = horzOffset || 0
      vertOffset = vertOffset || this.props.offset.default
      position = {
        left: referencePosition.left + scrollX + (referencePosition.width / 2) + horzOffset,
        top: referencePosition.top + scrollY - vertOffset
      }
    } else if (placement === 'bottom') {
      horzOffset = horzOffset || 0
      vertOffset = vertOffset || this.props.offset.default
      position = {
        left: referencePosition.left + scrollX + (referencePosition.width / 2) + horzOffset,
        top: referencePosition.top + scrollY + referencePosition.height + vertOffset
      }
    }

    this.setState({
      position
    })
    return position
  },

  /**
   * Public interface: Opens the `Portal`
   */
  openPopout () {
    this.calculatePosition()
    this.setState({
      isOpened: true
    })
  },

  /**
   * Public: Close the `Portal`
   */
  closePopout () {
    this.setState({
      isOpened: false
    })
  },

  /**
   * Public: Toggle the `Portal`
   */
  togglePopout () {
    this.setState({
      isOpened: !this.state.isOpened
    })
  },

  /**
   * Return the `container` node
   */
  getContainer () {
    return this.refs.container
  },

  onResize (e) {
    this.calculatePosition()
  },

  render () {
    // Extract Portal props
    let {
      closeOnEsc,
      closeOnOutsideClick,
      openByClickOn,
      onOpen,
      beforeClose,
      onClose,
      onUpdate
    } = this.props

    let { placement } = this.props
    let { isOpened, position } = this.state

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
        <div ref='reference'>
          { reference }
        </div>
        <Portal
          ref='portal'
          isOpened={isOpened}
          closeOnEsc={closeOnEsc}
          closeOnOutsideClick={closeOnOutsideClick}
          openByClickOn={openByClickOn}
          onOpen={onOpen}
          beforeClose={beforeClose}
          onClose={onClose}
          onUpdate={onUpdate}>
          <div className={styles.positioner} style={position}>
            <div className={arrowClassNames}/>
            <div ref='container' className={containerClassNames}>
              {children.slice(1)}
            </div>
          </div>
        </Portal>
      </div>
    )
  }
})

export default Popout
