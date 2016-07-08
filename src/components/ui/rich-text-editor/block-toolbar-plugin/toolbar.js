import React from 'react'
import {
  getVisibleSelectionRect,
  Entity,
  AtomicBlockUtils,
} from 'draft-js'
// Components
import Popout from '../../popout'
import BlockItems from './block-items'
import FormItems from './form-items'
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
          <div className={styles.buttonsWrapper}>
            <BlockItems
              itemsGroups={blockItemsGroups}
              closeToolbar={this.closeToolbar}
              openToolbar={this.openToolbar}
              editorState={editorState}
              onChange={onChange}/>
            <FormItems
              embeddableForms={embeddableFormsButtons}
              closeToolbar={this.closeToolbar}
              openToolbar={this.openToolbar}
              editorState={editorState}
              onChange={onChange}/>
          </div>
        </Popout>
      </div>
    )
  }
})

export default BlockToolbar
