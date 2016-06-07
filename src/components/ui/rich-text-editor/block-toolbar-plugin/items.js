import React from 'react'
import classNames from 'classnames'
import {
  RichUtils,
} from 'draft-js';

import styles from './items.mcss'

const BlockItems = React.createClass({

  propTypes: {
    items: React.PropTypes.array,
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getDefaultProps () {
    return {
      items: []
    }
  },

  toggleBlockType (blockType) {
    const {editorState, onChange, onSelect} = this.props
    onChange(
      RichUtils.toggleBlockType(editorState, blockType)
    )
    onSelect()
  },

  renderItems (items) {
    // const currentBlock = this.props.editorState.getCurrentInlineStyle()
    return items.map((item) => {
      // const active = currentStyle.has(item.style)
      const buttonClassNames = classNames(
        styles.button
        // {
        //   [`${styles.buttonActive}`]: active,
        // }
      )
      return (
        <button key={item.label} className={buttonClassNames} onClick={(e) => {
          e.preventDefault()
          this.toggleBlockType(item.type)
        }}>
          {item.label}
        </button>
      )
    })
  },

  render () {
    const {items} = this.props
    return (
      <div>
        <ul className={styles.list} onMouseDown={(e) => e.preventDefault()}>
          {this.renderItems(items)}
        </ul>
      </div>
    )
  }
})

export default BlockItems
