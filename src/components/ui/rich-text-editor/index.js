import React from 'react'
import PluginsEditor from 'draft-js-plugins-editor'
import {Editor} from 'draft-js'
import {fromJS, Map} from 'immutable'
// Plugins
import createInlineToolbarPlugin from './inline-toolbar-plugin'
// Styles
import './tmp.css'

/**
 * Rich Text Editor
 */
const RichTextEditor = React.createClass({
  propTypes: {
  },

  getInitialState () {
    const inlineToolbarPlugin = createInlineToolbarPlugin()
    this.InlineToolbar = inlineToolbarPlugin.InlineToolbar
    const {editorState, onChange} = this.props

    return {
      plugins: [
        inlineToolbarPlugin
      ],
      hasFocus: false,
    }
  },

  onFocus (e) {
    this.setState({hasFocus: true})
  },

  onBlur (e) {
    this.setState({hasFocus: false})
  },

  render () {
    const {editorState, onChange} = this.props
    const {hasFocus} = this.state
    const {InlineToolbar} = this

    return (
      <div className={this.props.className}>
        <InlineToolbar
          editorHasFocus={hasFocus}
          editorState={editorState}
          onChange={onChange} />
        <PluginsEditor
          plugins={this.state.plugins}
          editorState={editorState}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={onChange} />
      </div>
    )
  }
})

export default RichTextEditor
