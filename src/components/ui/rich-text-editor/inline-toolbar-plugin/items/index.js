import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  EditorState,
  Entity,
  RichUtils,
} from 'draft-js'
import {getSelectedEntityTypes} from '../../utils'
import * as styles from './styles'

class InlineToolbarItems extends Component {
  constructor (props) {
    super(props)
    // Bindings
    this.toggleFormat = this.toggleFormat.bind(this)
    this.toggleEntity = this.toggleEntity.bind(this)
    this.renderFormatters = this.renderFormatters.bind(this)
    this.renderEntities = this.renderEntities.bind(this)
  }

  toggleFormat (style) {
    const {editorState, onChange} = this.props
    onChange(
      RichUtils.toggleInlineStyle(editorState, style)
    )
  }

  toggleEntity (entity, active) {
    const {editorState, onChange} = this.props
    if (active) {
      const selection = editorState.getSelection()
      onChange(
        RichUtils.toggleLink(editorState, selection, null)
      )
    } else {
      const entityKey = Entity.create(
        entity.type,
        entity.mutability,
        entity.defaultData
      )
      let newState = RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      )
      newState = EditorState.forceSelection(
        newState,
        editorState.getSelection()
      )
      onChange(newState)
    }
  }

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
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return (
        <button key={formatter.label} className={buttonClassNames} onClick={(e) => {
          e.preventDefault()
          this.toggleFormat(formatter.style)
        }}>
          {(formatter.icon)
            ? <span
              title={formatter.label}
              className={iconWrapperClassNames}
              dangerouslySetInnerHTML={{__html: formatter.icon}}
            />
            : formatter.label
          }
        </button>
      )
      /* eslint-enable react/jsx-no-bind */
    })
  }

  renderEntities (entities) {
    const {editorState} = this.props
    const selectedEntityTypes = getSelectedEntityTypes(editorState)
    return entities.map((entity) => {
      const active = (selectedEntityTypes) ? selectedEntityTypes.includes(entity.type) : false
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
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return (
        <button key={entity.label} className={buttonClassNames} onClick={(e) => {
          e.preventDefault()
          this.toggleEntity(entity, active)
        }}>
          {(entity.icon)
            ? <span
              title={entity.label}
              className={iconWrapperClassNames}
              dangerouslySetInnerHTML={{__html: entity.icon}}
            />
            : entity.label
          }
        </button>
      )
      /* eslint-enable react/jsx-no-bind */
    })
  }

  render () {
    const {formatters, entities} = this.props
    return (
      <div>
        <ul className={styles.list}>
          {this.renderFormatters(formatters)}
          {this.renderEntities(entities)}
        </ul>
      </div>
    )
  }
}

InlineToolbarItems.defaultPprops = {
  entities: [],
  formatters: [],
}

InlineToolbarItems.propTypes = {
  editorState: PropTypes.object.isRequired,
  entities: PropTypes.array,
  formatters: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

export default InlineToolbarItems
