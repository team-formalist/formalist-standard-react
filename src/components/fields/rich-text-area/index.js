import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import {convertToRaw, EditorState, Entity, Modifier, RichUtils} from 'draft-js'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'

// Import styles
import styles from './rich-text-area.mcss'
import RichTextEditor from '../../ui/rich-text-editor'

// HTML
import exporter from 'draft-js-ast-exporter'
import importer from 'draft-js-ast-importer'


/**
 * Text Area field
 */
const RichTextArea = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    name: React.PropTypes.string,
    config: React.PropTypes.object,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      hint: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      inline: React.PropTypes.bool,
      box_size: React.PropTypes.oneOf(['single', 'small', 'normal', 'large', 'xlarge']),
      inline_formatters: React.PropTypes.array,
      block_formatters: React.PropTypes.array,
      embeddable_forms: React.PropTypes.object,
    }),
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list,
    value:  React.PropTypes.oneOfType([
      React.PropTypes.array,
      ImmutablePropTypes.list,
    ]),
  },

  componentWillMount () {
  },

  getInitialState () {
    let {value} = this.props
    value = (value && value.toJS) ? value.toJS() : value
    return {
      editorState: (value) ? EditorState.createWithContent(importer(value)) : EditorState.createEmpty()
    }
  },

  /**
   * onChange handler
   *
   * @param  {EditorState} editorState State from the editor
   */
  onChange (editorState) {
    const exporterOptions = {
      entityModifiers: {
        'formalist': (data) => {
          const copy = Object.assign({}, data)
          delete copy['ast']
          return copy
        }
      },
    }
    // Persist the value to the AST
    this.props.actions.edit(
      (val) => {
        return exporter(editorState, exporterOptions)
      }
    )
    // Keep track of the state here
    this.setState({
      editorState
    })
  },

  render () {
    const {attributes, errors, hint, label, name, value} = this.props
    const {editorState} = this.state
    let hasErrors = (errors.count() > 0)

    // Set up field classes
    let fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline
      }
    )

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors}/>
        </div>
        <div className={styles.display}>
          <RichTextEditor
            editorState={editorState}
            onChange={this.onChange}
            inlineFormatters={attributes.inline_formatters}
            blockFormatters={attributes.block_formatters}
            embeddableForms={attributes.embeddable_forms}
            boxSize={attributes.box_size}
            textSize={attributes.text_size}
            placeholder={attributes.placeholder} />
          {(hasErrors) ? <FieldErrors errors={errors}/> : null}
        </div>
      </div>
    )
  }
})


export default RichTextArea
