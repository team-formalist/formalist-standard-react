import template from '../../../../../'
import React from 'react'
import {
  Entity,
} from 'draft-js'

let configuredTemplate

const AtomicBlock = React.createClass({

  componentWillMount () {
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
      const formState = this.form.store.getState()
      Entity.mergeData(entityKey, {ast: formState})
    })
  },

  onFocus (e) {
    const {blockProps} = this.props
    blockProps.setReadOnly(true)
    console.log('focus')
  },

  onBlur (e) {
    const {blockProps} = this.props
    blockProps.setReadOnly(false)
    console.log('blur')
  },

  render () {
    return (
      <div contentEditable={false} onFocus={this.onFocus} onBlur={this.onBlur} style={{backgroundColor: '#fff', padding: '1.5rem', marginBottom: '1.5rem'}}>
        {this.form.render()}
      </div>
    )
  }
})

export default AtomicBlock
