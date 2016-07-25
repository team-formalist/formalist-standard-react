import React from 'react'
import classNames from 'classnames'
import {
  RichUtils,
} from 'draft-js'
import styles from './block-items.mcss'

/**
 * Find the current block type to apply from the list of `types`, rotating
 * through the list.
 * @param  {String} currentType Name of the current block type
 * @param  {Array} types List of the allowed types
 * @return {String} Name of the next block type to apply
 */
function getNextBlockTypeToApply(currentType, types) {
  const index = types.indexOf(currentType)
  if (index === -1) {
    return types[0]
  } else if (index < types.length - 1) {
    return types[index + 1]
  }
  return 'unstyled'
}

/**
 * Block items buttons
 */
const BlockItems = React.createClass({
  propTypes: {
    itemsGroups: React.PropTypes.array,
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getDefaultProps () {
    return {
      itemsGroups: []
    }
  },

  toggleBlockType (blockType) {
    const {editorState, onChange} = this.props
    onChange(
      RichUtils.toggleBlockType(editorState, blockType)
    )
  },

  renderItemsGroups (itemsGroups) {
    const {editorState, currentBlockType} = this.props
    return itemsGroups.map((group) => {
      const types = group.map((item) => item.type)
      const activeIndex = types.indexOf(currentBlockType)
      const isActive = (activeIndex > -1)
      const displayItem = (isActive) ? group[activeIndex] : group[0]

      const buttonClassNames = classNames(
        styles.button,
        {
          [`${styles.buttonActive}`]: isActive,
        }
      )
      const iconWrapperClassNames = classNames(
        styles.iconWrapper,
        {
          [`${styles.iconWrapperActive}`]: isActive,
        }
      )
      return (
        <button key={displayItem.type} className={buttonClassNames} onClick={(e) => {
          e.preventDefault()
          this.toggleBlockType(getNextBlockTypeToApply(currentBlockType, types))
        }}>
          {(displayItem.icon)
            ? <span title={displayItem.label} className={iconWrapperClassNames} dangerouslySetInnerHTML={{__html: displayItem.icon}}/>
            : displayItem.label
          }
        </button>
      )
    })
  },

  render () {
    const {itemsGroups} = this.props
    if (itemsGroups.length === 0) {
      return null
    }
    return (
      <div className={styles.container}>
        <ul className={styles.list} onMouseDown={(e) => e.preventDefault()}>
          {this.renderItemsGroups(itemsGroups)}
        </ul>
      </div>
    )
  }
})

export default BlockItems
