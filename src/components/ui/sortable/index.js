import React from 'react'
import update from 'react/lib/update'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Item from './item'

import styles from './sortable.mcss'

/**
 * Container for a sortable set of items
 *
 * <Sortable canRemove onRemove={(index) => ... } onSort={(newOrder) => ...}>
 *   <item/>
 *   <image/>
 *   {otherItems}
 * </Sortable>
 */
const Sortable = React.createClass({

  propTypes: {
    /**
     * canRemove
     * Indicates whether items are removable
     * @type {Boolean}
     */
    canRemove: React.PropTypes.bool,
    children: React.PropTypes.node,
    /**
     * onRemove
     * Callback. Fired when the remove button is clicked. Is passed the
     * *current* index of the item to be removed
     * @type {Function}
     */
    onRemove: React.PropTypes.func,
    /**
     * onSort
     * Callback. Fired when the sort change is effected
     * @type {Function}
     */
    onSort: React.PropTypes.func
  },

  getInitialState () {
    return {
      items: React.Children.map(this.props.children, (child, index) => (
        {
          component: child,
          originalIndex: index
        }
      ))
    }
  },

  componentWillReceiveProps (nextProps) {
    this.setState({
      items: React.Children.map(nextProps.children, (child, index) => (
        {
          component: child,
          originalIndex: index
        }
      ))
    })
  },

  /**
   * moveItem
   *
   * Updates the internal representation of the list, and propagates that data
   * changes upward through `onSort`
   *
   * @param  {Number} dragIndex The current index of the item being dragged
   * @param  {Number} hoverIndex The current index of the item being hovered
   */
  moveItem (dragIndex, hoverIndex) {
    const { onSort } = this.props
    const { items } = this.state
    const dragItem = items[dragIndex]

    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      }
    }), () => {
      onSort(
        items.map((item) => (item.originalIndex))
      )
    })
  },

  render () {
    const { items } = this.state
    const { canRemove, onRemove } = this.props

    return (
      <div className={ styles.base }>
        { items.map((item, index) => (
          <Item
            key={ item.originalIndex }
            moveItem={ this.moveItem }
            index={ index }
            originalIndex={ item.originalIndex }
            canRemove={ canRemove }
            onRemove={ onRemove }>
            { item.component }
          </Item>
        )) }
      </div>
    )
  }
})

module.exports = DragDropContext(HTML5Backend)(Sortable)
