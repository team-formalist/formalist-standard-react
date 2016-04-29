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
import exporter from 'draft-js-exporter'

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
      box_size: React.PropTypes.oneOf(['single', 'small', 'normal', 'large', 'xlarge'])
    }),
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: React.PropTypes.string
  },

  componentWillMount () {
    const customRenderers = {
      entity: {
        'mention': (type, mutability, data, children) => {
          return [
            `<span data-entity-type='${type}' data-entity-data='${JSON.stringify(data)}'>`,
            children,
            '</span>',
          ]
        }
      }
    }
    this.exporter = exporter()
  },

  getInitialState () {
    return {
      editorState: EditorState.createEmpty()
    }
  },

  /**
   * onChange handler
   *
   * @param  {EditorState} editorState State from the editor
   */
  onChange (editorState) {
    // console.log('!!! ONCHANGE');
    // console.log('raw', convertToRaw(
    //   editorState.getCurrentContent()
    // ))
    // console.log('plain', editorState.getCurrentContent().getPlainText())
    const exportedData = this.exporter(editorState)

    this.setState({
      editorState,
      exportedData,
    })
  },

  onBoldClick (e) {
    e.preventDefault()
    const {editorState} = this.state
    this.onChange(
      RichUtils.toggleInlineStyle(editorState, 'BOLD')
    )
  },

  onItalicClick (e) {
    e.preventDefault()
    const {editorState} = this.state
    this.onChange(
      RichUtils.toggleInlineStyle(editorState, 'ITALIC')
    )
  },

  // onLinkClick (e) {
  //   e.preventDefault()
  //   const {editorState} = this.state
  //   const contentState = editorState.getCurrentContent()
  //   const targetRange = editorState.getSelection()
  //   const key = Entity.create('LINK', 'MUTABLE', {href: 'http://www.zombo.com'});
  //   const contentStateWithLink = Modifier.applyEntity(
  //     contentState,
  //     targetRange,
  //     key
  //   )
  //   const newEditorState = EditorState.push(
  //     editorState,
  //     contentStateWithLink
  //   )
  //   this.setState({
  //     editorState: newEditorState
  //   })
  // },

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

    // Set up input classes
    let inputClassNames = classNames({
      [`${styles.code}`]: attributes.code
    })

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors}/>
        </div>
        <div className={styles.display}>
          <button onClick={this.onBoldClick}>Bold</button>
          <button onClick={this.onItalicClick}>Italic</button>
          <RichTextEditor className={styles.editor} editorState={editorState} onChange={this.onChange}/>
          <div className={styles.code}>
            {(this.state.exportedData) ? this.state.exportedData : null}
          </div>
          {(hasErrors) ? <FieldErrors errors={errors}/> : null}
        </div>
      </div>
    )
  }
})


export default RichTextArea
