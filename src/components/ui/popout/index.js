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
    this.calculatePosition()
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
    let { placement, offset } = this.props
    let { top, left, height, width } = this.refs.reference.getBoundingClientRect()
    let { horz, vert } = offset

    if (placement === 'left') {
      horz = horz || offset.default
      vert = vert || 0
      position = {
        left: left - horz,
        top: top + vert + (height / 2 - arrowVertPosition)
      }
    } else if (placement === 'right') {
      horz = horz || offset.default
      vert = vert || 0
      position = {
        left: left + width + horz,
        top: top + vert + (height / 2 - arrowVertPosition)
      }
    } else if (placement === 'top') {
      horz = horz || 0
      vert = vert || offset.default
      position = {
        left: left + (width / 2) + horz,
        top: top - vert
      }
    } else if (placement === 'bottom') {
      horz = horz || 0
      vert = vert || offset.default
      position = {
        left: left + (width / 2) + horz,
        top: top + height + vert
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
    return this.refs.portal.openPortal()
  },

  /**
   * Public: Close the `Portal`
   */
  closePopout () {
    return this.refs.portal.closePortal()
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
    let { position } = this.state

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
          closeOnEsc={ closeOnEsc }
          closeOnOutsideClick={ closeOnOutsideClick }
          openByClickOn={ openByClickOn }
          onOpen={ onOpen }
          beforeClose={ beforeClose }
          onClose={ onClose }
          onUpdate={ onUpdate }>
          <div className={ styles.positioner } style={ position }>
            <div className={ arrowClassNames }/>
            <div ref='container' className={ containerClassNames }>
              { children.slice(1) }
            </div>
          </div>
        </Portal>
      </div>
    )
  }
})

export default Popout
