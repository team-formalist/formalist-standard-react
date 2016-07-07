import React from 'react'
import {
  getVisibleSelectionRect,
  Entity,
  AtomicBlockUtils,
} from 'draft-js'
// Components
import Popout from '../../popout'
import Items from './items'
// Styles
import styles from './toolbar.mcss'

/**
 * Block Toolbar
 *
 */
const BlockToolbar = React.createClass({
  propTypes: {
    blockItemsGroups: React.PropTypes.array,
    embeddableForms: React.PropTypes.object,
    editorHasFocus: React.PropTypes.bool.isRequired,
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState () {
    return {
      open: false,
    }
  },

  componentWillMount () {
    window.addEventListener('keydown', this.onKeyDown)
  },

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  },

  /**
   * Handle position and visibility of the toolbar
   */
  componentWillReceiveProps (nextProps) {
    // We have to wait a tick to calculate the position
    window.requestAnimationFrame(() => {
      this.setState({
        positionStyle: this.calculatePosition()
      })
    })
  },

  /**
   * Calculate the position of the toolbar based on the visible selection
   * and the position of the `positioner`s offsetParent.
   *
   * @return {Object} Description of the position/size of the positioner
   */
  calculatePosition () {
    const {editorState, setReadOnly} = this.props
    const selection = editorState.getSelection()
    const selectedBlockKey = selection.getStartKey()
    const selectedBlock = document.querySelector(`[data-block][data-offset-key^='${selectedBlockKey}']`)
    if (selectedBlock && this._positioner) {
      const blockRect = selectedBlock.getBoundingClientRect()
      const positionerParentRect = this._positioner.offsetParent.getBoundingClientRect()
      return {
        top: Math.floor(
          blockRect.top -
          positionerParentRect.top -
          8
        ),
      }
    }
    return {}
  },

  onKeyDown (e) {
    this.closeToolbar()
  },

  openToolbar () {
    this.setState({
      open: true
    })
  },

  closeToolbar () {
    this.setState({
      open: false
    })
  },

  insertAtomicBlock (form) {
    const {editorState, onChange} = this.props
    const entityKey = Entity.create('formalist', 'IMMUTABLE', {
      name: form.name,
      ast: form.template,
    })
    onChange(
      AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        '¶'
      )
    )
  },

  renderEmbeddableFormsButtons (buttons) {
    return buttons.map((button) => {
      const onClick = (e) => {
        e.preventDefault()
        this.insertAtomicBlock(button)
      }
      return <button key={button.name} onClick={onClick}>{button.label || button.name}</button>
    })
  },

  render () {
    const {blockItemsGroups, editorState, embeddableForms, onChange} = this.props
    const {open, positionStyle} = this.state

    // Suck out our forms into a slightly friendly format
    let embeddableFormsButtons = []
    if (embeddableForms) {
      embeddableFormsButtons = Object.keys(embeddableForms).map((identifier) => {
        const form = embeddableForms[identifier]
        return Object.assign({}, form, {name: identifier})
      })
    }

    return (
      <div>
        <Popout placement='bottom' isOpened={open} closeOnOutsideClick={true} closeOnEsc onClose={this.closeToolbar}>
          <div style={positionStyle} className={styles.positioner} ref={(r) => this._positioner = r}>
            <button
              className={styles.toggle}
              onClick={(e) => {
                e.preventDefault()
                this.openToolbar()
              }}
              onMouseDown={(e) => e.preventDefault()}>
              ¶
              <span className={styles.toggleText}>View block elements</span>
            </button>
          </div>
          <div>
            <Items itemsGroups={blockItemsGroups} editorState={editorState} onChange={onChange}/>
            {(embeddableFormsButtons.length > 0)
              ? this.renderEmbeddableFormsButtons(embeddableFormsButtons)
              : null
            }
          </div>
        </Popout>
      </div>
    )
  }
})

export default BlockToolbar
