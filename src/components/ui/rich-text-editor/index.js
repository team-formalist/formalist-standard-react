import React from 'react'
import PluginsEditor from 'draft-js-plugins-editor'
import {Editor} from 'draft-js'
import {fromJS, Map} from 'immutable'

import './tmp.css'

// Plugins


import createInlineToolbarPlugin from '../rich-text-editor-inline-toolbar'
const inlineToolbarPlugin = createInlineToolbarPlugin()
const {InlineToolbar} = inlineToolbarPlugin

const RichTextEditor = React.createClass({
  propTypes: {
  },

  getInitialState () {
    const { editorState, onChange } = this.props

    return {
      plugins: [
        inlineToolbarPlugin
      ]
    }
  },

  render () {
    const { editorState, onChange } = this.props

    return (
      <div className={this.props.className}>
        <InlineToolbar
          editorState={editorState}
          onChange={onChange} />
        <PluginsEditor
          plugins={this.state.plugins}
          editorState={editorState}
          onChange={onChange} />
      </div>
    )
  }
})


/**
 * Plugins
 */


export default RichTextEditor
