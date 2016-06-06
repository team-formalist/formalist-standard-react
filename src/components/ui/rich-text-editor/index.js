import React from 'react'
import PluginsEditor from 'draft-js-plugins-editor'
import {Editor} from 'draft-js'
import {fromJS, Map} from 'immutable'
// Plugins
import createSingleLinePlugin from 'draft-js-single-line-plugin'
import createInlineToolbarPlugin from './inline-toolbar-plugin'
// Styles
import './tmp.css'

/**
 * Rich Text Editor
 */
const RichTextEditor = React.createClass({
  propTypes: {
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState () {
    const plugins = this.configurePlugins()

    return {
      plugins,
      hasFocus: false,
    }
  },

  /**
   * Handle the configuration of the various plugins we allow to pass in
   * @return {Array} List of draft-js-plugins compatible plugins
   */
  configurePlugins () {
    const {inlineFormatters, boxSize} = this.props
    const singleLinePlugin = createSingleLinePlugin()
    const inlineToolbarPlugin = createInlineToolbarPlugin({
      inlineFormatters
    })
    // Build up the list of plugins
    let plugins = [
      inlineToolbarPlugin
    ]
    // Add singleLine plugin if the boxSize matches
    if (boxSize === 'single') {
      plugins = plugins.concat([singleLinePlugin])
    }
    // Extract the toolbar component for use in rendering
    this.InlineToolbar = inlineToolbarPlugin.InlineToolbar
    return plugins
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
