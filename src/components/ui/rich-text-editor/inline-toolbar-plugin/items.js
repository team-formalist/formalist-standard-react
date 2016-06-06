import React from 'react'
import classNames from 'classnames'
import {
  RichUtils,
} from 'draft-js';

import styles from './items.mcss'

const InlineToolbarItems = React.createClass({

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

  toggleStyle (style) {
    const {editorState, onChange} = this.props
    onChange(
      RichUtils.toggleInlineStyle(editorState, style)
    )
  },

  renderItems (items) {
    const currentStyle = this.props.editorState.getCurrentInlineStyle()
    return items.map((item) => {
      const active = currentStyle.has(item.style)
      const buttonClassNames = classNames(
        styles.button,
        {
          [`${styles.buttonActive}`]: active,
        }
      )
      return (
        <button key={item.label} className={buttonClassNames} onClick={(e) => {
          e.preventDefault()
          this.toggleStyle(item.style)
        }}>
          {item.label}
        </button>
      )
    })
  },

  render () {
    const {items} = this.props
    // We need to cancel onMouseDown to avoid the buttons capturing focus
    return (
      <div>
        <ul className={styles.list} onMouseDown={(e) => e.preventDefault()}>
          {this.renderItems(items)}
        </ul>
      </div>
    )
  }
})

export default InlineToolbarItems
