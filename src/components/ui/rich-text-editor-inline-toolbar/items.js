import React from 'react'
import classNames from 'classnames'
import {
  RichUtils,
} from 'draft-js';

import styles from './items.mcss'

const defaultItems = [
  {
    label: 'Bold',
    style: 'BOLD',
  },
  {
    label: 'Italic',
    style: 'ITALIC',
  },
  {
    label: 'Code',
    style: 'CODE',
  },
]

const InlineToolbarItems = React.createClass({

  propTypes: {
    items: React.PropTypes.array,
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState () {
    let items = defaultItems.slice(0)
    if (this.props.items) {
      items = items.concat(this.props.items)
    }
    return {
      items,
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
    const {items} = this.state
    // Note: We need to cancel onMouseDown to avoid the buttons capturing focus
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
