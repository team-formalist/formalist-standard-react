import React from 'react'
import PluginsEditor from 'draft-js-plugins-editor'
import {Editor} from 'draft-js'
import {fromJS, Map} from 'immutable'
// Plugins
import createAutoListPlugin from 'draft-js-autolist-plugin'
import createSingleLinePlugin from 'draft-js-single-line-plugin'
import createBlockToolbarPlugin from './block-toolbar-plugin'
import createInlineToolbarPlugin from './inline-toolbar-plugin'
// Styles
import styles from './rich-text-editor.mcss'
import './tmp.css'

/**
 * Rich Text Editor
 */
const RichTextEditor = React.createClass({
  propTypes: {
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
  },

  getDefaultProps () {
    return {
      placeholder: 'Start writing …',
    }
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
    const {
      blockFormatters,
      inlineFormatters,
      boxSize,
    } = this.props
    const autoListPlugin = createAutoListPlugin()
    const singleLinePlugin = createSingleLinePlugin()
    const blockToolbarPlugin = createBlockToolbarPlugin({
      blockFormatters
    })
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
    } else {
      plugins = plugins.concat([autoListPlugin, blockToolbarPlugin])
    }
    // Extract the toolbar component for use in rendering
    this.BlockToolbar  = blockToolbarPlugin.BlockToolbar
    this.InlineToolbar = inlineToolbarPlugin.InlineToolbar
    return plugins
  },

  onFocus (e) {
    this.setState({hasFocus: true})
  },

  onBlur (e) {
    this.setState({hasFocus: false})
  },

  /**
   * Focus the editor when the `contentEl` is clicked
   * @param  {MouseEvent} e
   */
  onContentClick (e) {
    e.preventDefault()
    if (e.target === this.contentEl) {
      this.editor.focus()
    }
  },

  render () {
    const {boxSize, blockFormatters, editorState, onChange, placeholder} = this.props
    const {hasFocus} = this.state
    const {
      BlockToolbar,
      InlineToolbar,
    } = this

    return (
      <div className={styles.base}>
        {(boxSize !== 'single')
          ? <div className={styles.gutter}>
              <BlockToolbar
                blockFormatters={blockFormatters}
                editorHasFocus={hasFocus}
                editorState={editorState}
                onChange={onChange} />
            </div>
          : null
        }
        <div className={styles.content} ref={(c) => this.contentEl = c} onClick={this.onContentClick}>
          <InlineToolbar
            editorHasFocus={hasFocus}
            editorState={editorState}
            onChange={onChange} />
          <PluginsEditor
            ref={(c) => this.editor = c}
            placeholder={placeholder}
            plugins={this.state.plugins}
            editorState={editorState}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={onChange} />
        </div>
      </div>
    )
  }
})

export default RichTextEditor
