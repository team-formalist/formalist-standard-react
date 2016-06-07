import React from 'react'
import classNames from 'classnames'
import {
  RichUtils,
} from 'draft-js';

import styles from './items.mcss'

function getBlockTypeToApply(currentType, types) {
  const index = types.indexOf(currentType)
  if (index === -1) {
    return types[0]
  } else if (index < types.length - 1) {
    return types[index + 1]
  }
  return 'unstyled'
}

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
    const {editorState} = this.props
    const currentBlockType = RichUtils.getCurrentBlockType(editorState)
    return itemsGroups.map((group) => {
      const active = (group.types.indexOf(currentBlockType) > -1)
      const buttonClassNames = classNames(
        styles.button,
        {
          [`${styles.buttonActive}`]: active,
        }
      )
      return (
        <button key={group.label} className={buttonClassNames} onClick={(e) => {
          e.preventDefault()
          this.toggleBlockType(getBlockTypeToApply(currentBlockType, group.types))
        }}>
          {group.label}
        </button>
      )
    })
  },

  render () {
    const {itemsGroups} = this.props
    return (
      <div>
        <ul className={styles.list} onMouseDown={(e) => e.preventDefault()}>
          {this.renderItemsGroups(itemsGroups)}
        </ul>
      </div>
    )
  }
})

export default BlockItems
