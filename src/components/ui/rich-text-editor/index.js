import React from 'react'
import Editor from 'draft-js-plugins-editor'

// Plugins
import autoList from '../rte-auto-list'
import './tmp.css'

const RichTextEditor = React.createClass({
  propTypes: {
  },

  getInitialState () {
    const { editorState, onChange } = this.props

    return {
      plugins: [
        autoList({editorState})
      ]
    }
  },

  render () {
    const { editorState, onChange } = this.props

    return (
      <Editor editorState={editorState} onChange={onChange} plugins={this.state.plugins}/>
    )
  }
})


/**
 * Plugins
 */


export default RichTextEditor
