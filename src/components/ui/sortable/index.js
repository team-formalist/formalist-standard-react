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
     * onDrop
     * Callback. Fired _after_ the sort is effected
     * @type {Function}
     */
    onDrop: React.PropTypes.func,
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
    onSort: React.PropTypes.func,
    verticalControls: React.PropTypes.bool
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
   * onDrop
   *
   * Updates the internal representation of the list, and propagates that data
   * changes upward through `this.props.onDrop`
   */
  onDrop () {
    if (this.props.onDrop) {
      this.props.onDrop(
        this.state.items.map((item) => (item.originalIndex))
      )
    }
  },

  /**
   * onSort
   *
   * Updates the internal representation of the list, and propagates that data
   * changes upward through `this.props.onSort`
   */
  onSort () {
    if (this.props.onSort) {
      this.props.onSort(
        this.state.items.map((item) => (item.originalIndex))
      )
    }
  },

  /**
   * moveItem
   *
   * Updates the internal representation of the list
   *
   * @param  {Number} dragIndex The current index of the item being dragged
   * @param  {Number} hoverIndex The current index of the item being hovered
   */
  moveItem (dragIndex, hoverIndex) {
    const { items } = this.state
    const dragItem = items[dragIndex]
    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      }
    }))
  },

  render () {
    const { items } = this.state
    const { canRemove, onRemove, verticalControls } = this.props
    const canSort = (items.length > 1)

    return (
      <div className={styles.base}>
        {items.map((item, index) => (
          <Item
            key={item.originalIndex}
            moveItem={this.moveItem}
            onDrop={this.onDrop}
            index={index}
            originalIndex={item.originalIndex}
            canSort={canSort}
            canRemove={canRemove}
            onRemove={onRemove}
            verticalControls={verticalControls}>
            {item.component}
          </Item>
        ))}
      </div>
    )
  }
})

module.exports = DragDropContext(HTML5Backend)(Sortable)
