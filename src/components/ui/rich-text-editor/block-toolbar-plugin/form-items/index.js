import React from 'react'
import classNames from 'classnames'
import {
  AtomicBlockUtils,
  Entity,
  getVisibleSelectionRect,
  RichUtils,
} from 'draft-js'
import createDataObjectRenderer from 'formalist-data-object-renderer'
import styles from './form-items.mcss'

// Initialise the dataObjectRenderer
const dataObjectRenderer = createDataObjectRenderer()

const FormItems = React.createClass({
  propTypes: {
    embeddableForms: React.PropTypes.array,
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getDefaultProps () {
    return {
      embeddableForms: []
    }
  },

  insertAtomicBlock (formConfig) {
    const {editorState, onChange, closeToolbar} = this.props
    const entityKey = Entity.create('formalist', 'IMMUTABLE', {
      name: formConfig.name,
      label: formConfig.label,
      form: formConfig.form,
      data: dataObjectRenderer(formConfig.form),
    })
    onChange(
      AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        '¶'
      )
    )
    closeToolbar()
  },

  renderFormButtons (embeddableForms) {
    return embeddableForms.map((form) => {
      const onClick = (e) => {
        e.preventDefault()
        this.insertAtomicBlock(form)
      }
      return <button className={styles.button} key={form.name} onClick={onClick}>{form.label || form.name}</button>
    })
  },

  render () {
    const {embeddableForms} = this.props
    if (embeddableForms.length === 0) {
      return null
    }
    return (
      <div className={styles.container}>
        <ul className={styles.list} onMouseDown={(e) => e.preventDefault()}>
          {this.renderFormButtons(embeddableForms)}
        </ul>
      </div>
    )
  }
})

export default FormItems
