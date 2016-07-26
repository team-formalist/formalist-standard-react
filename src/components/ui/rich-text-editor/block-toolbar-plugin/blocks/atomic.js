import classNames from 'classnames'
import template from '../../../../../'
import React from 'react'
import {
  Entity,
} from 'draft-js'
import createDataObjectRenderer from 'formalist-data-object-renderer'
import styles from './atomic.mcss'

const dataObjectRenderer = createDataObjectRenderer()
let configuredTemplate

const AtomicBlock = React.createClass({
  getInitialState () {
    const entityKey = this.props.block.getEntityAt(0)
    this.entity = Entity.get(entityKey)
    return {
      isSelected: false
    }
  },

  componentWillMount () {
    document.addEventListener('mouseup', this.handleOutsideMouseClick)
    document.addEventListener('touchstart', this.handleOutsideMouseClick)

    // Memoize the configured template the first time this runs
    // We need to invoke this at execution time so that the circular
    // dependencies are properly resolved.
    configuredTemplate = configuredTemplate ||  template()

    // Extract the entity
    const {ast} = this.entity.getData()
    const type = this.entity.getType()

    this.form = configuredTemplate(ast)

    this.form.store.subscribe(() => {
      const ast = this.form.store.getState()
      const normalized = dataObjectRenderer(ast)
      Entity.replaceData(entityKey, {
        ast,
        normalized,
      })
      this.forceUpdate()
    })

    // Subscribe to the editorEmitter’s onChange event
    const {editorEmitter} = this.props.blockProps
    editorEmitter.on('change', this.onEditorChange)
    editorEmitter.on('focus', this.checkEditorSelection)
    editorEmitter.on('blur', this.checkEditorSelection)
  },

  componentWillUnmount () {
    const {editorEmitter} = this.props.blockProps
    editorEmitter.off('change', this.onEditorChange)
    editorEmitter.off('focus', this.checkEditorSelection)
    editorEmitter.off('blur', this.checkEditorSelection)
  },

  onEditorChange (editorState) {
    this.checkEditorSelection(editorState)
  },

  onEditorFocus (editorState) {
    this.checkEditorSelection(editorState)
  },

  checkEditorSelection (editorState) {
    const {editorEmitter} = this.props.blockProps
    const selection = editorState.getSelection()
    let isSelected = false
    // Is a collapsed selection at the start?
    if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
      const {block} = this.props
      const blockKey = block.getKey()
      const selectedBlockKey = selection.getFocusKey()
      if (blockKey === selectedBlockKey) {
        isSelected = true
        editorEmitter.emit('atomic:selected', blockKey)
      }
    }
    this.setState({
      isSelected
    })
  },

  onFocus (e) {
    this.setState({
      isSelected: false,
    })
    this.setReadOnly(true)
  },

  onBlur (e) {
    this.setReadOnly(false)
  },

  remove () {
    console.log('REMOVE')
  },

  setReadOnly (readOnly) {
    const {blockProps} = this.props
    blockProps.setReadOnly(readOnly)
  },

  render () {
    const {isSelected} = this.state
    const {label} = this.entity.getData()

    const containerClassNames = classNames(
      styles.container,
      {
        [`${styles.containerSelected}`]: isSelected
      }
    )

    return (
      <div className={styles.wrapper} data-debug-block-key={this.props.block.getKey()}>
        <div className={styles.caret}><br/></div>
        <div
          ref={(r) => this._blockContainer = r}
          className={containerClassNames}
          onClick={this.onFocus}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          contentEditable={false}>
          <div className={styles.header}>
            <h3 className={styles.label}>{label}</h3>
            <div className={styles.toolbar}>
              <button className={styles.remove} onClick={(e) => {
                e.preventDefault()
                this.remove()
              }}>
                <span className={styles.removeText}>Remove</span>
                <div className={styles.removeX}>×</div>
              </button>
            </div>
          </div>
          <div className={styles.content}>
            {this.form.render()}
          </div>
        </div>
      </div>
    )
  }
})

export default AtomicBlock
