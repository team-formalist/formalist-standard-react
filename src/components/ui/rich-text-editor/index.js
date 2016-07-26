import React from 'react'
import classNames from 'classnames'
import PluginsEditor from 'draft-js-plugins-editor'
import {Editor} from 'draft-js'
import {fromJS, Map} from 'immutable'
import Emitter from 'component-emitter'
// Plugins
import createAutoListPlugin from 'draft-js-autolist-plugin'
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'
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
    embeddableForms: React.PropTypes.object,
    blockFormatters: React.PropTypes.array,
    boxSize: React.PropTypes.string,
    inlineFormatters: React.PropTypes.array,
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
    return {
      someProp: Date.now(),
      hasFocus: false,
    }
  },

  componentWillMount () {
    // Create a per-instance event emitter to pass through to the atomic blocks
    // so that we can subscribe to `onChange` events in the editor proper
    // This is not really great, but there’s way for a prop
    this.emitter = new Emitter()
    const plugins = this.configurePlugins()
    this.setState({
      plugins,
    })
  },

  /**
   * Handle the configuration of the various plugins we allow to pass in
   * @return {Array} List of draft-js-plugins compatible plugins
   */
  configurePlugins () {
    const {
      embeddableForms,
      blockFormatters,
      boxSize,
      inlineFormatters,
    } = this.props
    const autoListPlugin = createAutoListPlugin()
    const singleLinePlugin = createSingleLinePlugin()

    // Configure the blockToolbarPlugin
    // Pass through any
    this.blockToolbarPlugin = createBlockToolbarPlugin({
      setReadOnly: this.setReadOnly,
      editorEmitter: this.emitter,
      embeddableForms,
      blockFormatters,
    })
    const inlineToolbarPlugin = createInlineToolbarPlugin({
      inlineFormatters
    })
    // Build up the list of plugins
    let plugins = [
      inlineToolbarPlugin,
      createBlockBreakoutPlugin(),
    ]
    // Add singleLine plugin if the boxSize matches
    if (boxSize === 'single') {
      plugins = plugins.concat([singleLinePlugin])
    } else {
      plugins = plugins.concat([autoListPlugin, this.blockToolbarPlugin])
    }
    // Extract the toolbar component for use in rendering
    this.BlockToolbar  = this.blockToolbarPlugin.BlockToolbar
    this.blockRenderMap  = this.blockToolbarPlugin.blockRenderMap
    this.InlineToolbar = inlineToolbarPlugin.InlineToolbar
    return plugins
  },

  onFocus (e) {
    const {editorState} = this.props
    this.emitter.emit('focus', editorState)
    this.setState({hasFocus: true})
  },

  onBlur (e) {
    const {editorState} = this.props
    this.emitter.emit('blur', editorState)
    this.setState({hasFocus: false})
  },

  /**
   * Set the editor to read-only (or note)
   * @param {Boolean} readOnly
   */
  setReadOnly (readOnly) {
    this.setState({readOnly})
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
    const {hasFocus, readOnly} = this.state
    const {
      BlockToolbar,
      InlineToolbar,
    } = this

    let placeholderBlockType = false
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      placeholderBlockType = contentState.getBlockMap().first().getType()
    }

    // Set up content wrapper classes
    let contentClassNames = classNames(
      styles.content,
      {
        [`${styles['contentPlaceholder--' + placeholderBlockType]}`]: (placeholderBlockType && styles['contentPlaceholder--' + placeholderBlockType])
      }
    )

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
        <div className={contentClassNames} ref={(c) => this.contentEl = c} onClick={this.onContentClick}>
          <InlineToolbar
            editorHasFocus={hasFocus}
            editorState={editorState}
            onChange={onChange} />
          <PluginsEditor
            ref={(c) => this.editor = c}
            blockRenderMap={this.blockRenderMap}
            placeholder={placeholder}
            plugins={this.state.plugins}
            editorState={editorState}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={(editorState) => {
              // Emit the onChange event so we can listen to it
              // from within our atomic blocks
              this.emitter.emit('change', editorState)
              onChange(editorState)
            }}
            readOnly={readOnly} />
        </div>
      </div>
    )
  }
})

export default RichTextEditor
