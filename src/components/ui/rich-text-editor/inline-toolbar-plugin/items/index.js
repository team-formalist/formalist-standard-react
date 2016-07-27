import React from 'react'
import classNames from 'classnames'
import {
  RichUtils,
} from 'draft-js'
import styles from './items.mcss'

const InlineToolbarItems = React.createClass({

  propTypes: {
    formatters: React.PropTypes.array,
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getDefaultProps () {
    return {
      formatters: []
    }
  },

  toggleStyle (style) {
    const {editorState, onChange} = this.props
    onChange(
      RichUtils.toggleInlineStyle(editorState, style)
    )
  },

  renderFormatters (formatters) {
    const {editorState} = this.props
    const currentStyle = editorState.getCurrentInlineStyle()

    return formatters.map((formatter) => {
      const active = currentStyle.has(formatter.style)
      const buttonClassNames = classNames(
        styles.button,
        {
          [`${styles.buttonActive}`]: active,
        }
      )
      const iconWrapperClassNames = classNames(
        styles.iconWrapper,
        {
          [`${styles.iconWrapperActive}`]: active,
        }
      )
      return (
        <button key={formatter.label} className={buttonClassNames} onClick={(e) => {
          e.preventDefault()
          this.toggleStyle(formatter.style)
        }}>
          {(formatter.icon)
            ? <span title={formatter.label} className={iconWrapperClassNames} dangerouslySetInnerHTML={{__html: formatter.icon}}/>
            : formatter.label
          }
        </button>
      )
    })
  },

  render () {
    const {formatters} = this.props
    // We need to cancel onMouseDown to avoid the buttons capturing focus
    return (
      <div>
        <ul className={styles.list} onMouseDown={(e) => e.preventDefault()}>
          {this.renderFormatters(formatters)}
        </ul>
      </div>
    )
  }
})

export default InlineToolbarItems
