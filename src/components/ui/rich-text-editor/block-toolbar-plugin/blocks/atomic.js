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
      render: Date.now()
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
      this.setState({
        render: Date.now()
      })
    })
  },

  onFocus (e) {
    this.setReadOnly(true)
    console.log('focus')
  },

  onBlur (e) {
    this.setReadOnly(false)
    console.log('blur')
  },

  setReadOnly (readOnly) {
    const {blockProps} = this.props
    blockProps.setReadOnly(readOnly)
  },

  render () {
    return (
      <div
        ref={(r) => this._blockContainer = r}
        contentEditable={false}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        style={{backgroundColor: '#fff', padding: '1.5rem', marginBottom: '1.5rem'}}>
        {this.form.render()}
      </div>
    )
  }
})

export default AtomicBlock
