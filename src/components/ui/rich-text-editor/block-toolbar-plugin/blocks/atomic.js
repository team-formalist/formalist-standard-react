import template from '../../../../../'
import React from 'react'
import {
  Entity,
} from 'draft-js'
import createDataObjectRenderer from 'formalist-data-object-renderer'

const dataObjectRenderer = createDataObjectRenderer()
let configuredTemplate

const AtomicBlock = React.createClass({

  getInitialState () {
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
    const entityKey = this.props.block.getEntityAt(0)
    const entity = Entity.get(entityKey)
    const {ast} = entity.getData()
    const type = entity.getType()

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

  setReadOnly (readOnly) {
    const {blockProps} = this.props
    blockProps.setReadOnly(readOnly)
  },

  render () {
    const {isSelected} = this.state
    console.log('render')
    return (
      <div>
        <div><br/></div>
        <div
          ref={(r) => this._blockContainer = r}
          onClick={this.onFocus}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          style={{backgroundColor: '#fff', padding: '1.5rem', marginBottom: '1.5rem'}}
          contentEditable={false}>
          <div>{this.props.block.getKey()}</div>
          <div>{(isSelected) ? 'SELECTED' : ''}</div>
          {this.form.render()}
        </div>
      </div>
    )
  }
})

export default AtomicBlock
