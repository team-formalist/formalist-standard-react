import React from 'react'
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
    this.calculatePosition()
  },

  componentWillMount () {
    window.addEventListener('resize', this.onResize)
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  },

  /**
   * Public interface: Calculate the position of the popunder wrapper
   * @return {Object} Updated position we're setting
   */
  calculatePosition () {
    // Only bother if its rendered
    let { left, top, height } = this.refs.reference.getBoundingClientRect()
    let position = {
      left: left + this.props.offset.left,
      top: top + height + this.props.offset.top
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
    return this.refs.portal.openPortal()
  },

  /**
   * Public: Close the `Portal`
   */
  closePopunder () {
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
      beforeClose,
      children,
      closeOnEsc,
      closeOnOutsideClick,
      onClose,
      onOpen,
      onUpdate,
      openByClickOn
    } = this.props

    let { position } = this.state

    // Extract the reference element
    // AKA child.first
    let arr = React.Children.toArray(children)
    let reference = arr[0]

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
          <div ref='container' className={ styles.container } style={ position }>
            { arr.slice(1) }
          </div>
        </Portal>
      </div>
    )
  }
})

export default Popunder
