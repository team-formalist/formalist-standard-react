import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import {convertToRaw, EditorState} from 'draft-js'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'

// Import styles
import styles from './rich-text-area.mcss'
import RichTextEditor from '../../ui/rich-text-editor'

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
    console.log('!!! ONCHANGE');
    console.log('raw', convertToRaw(
      editorState.getCurrentContent()
    ))
    // console.log('plain', editorState.getCurrentContent().getPlainText())
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
          <RichTextEditor editorState={editorState} onChange={this.onChange}/>
          {(hasErrors) ? <FieldErrors errors={errors}/> : null}
        </div>
      </div>
    )
  }
})


export default RichTextArea
