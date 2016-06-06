import React from 'react'
import {
  getVisibleSelectionRect,
} from 'draft-js'
// Components
import Popout from '../../popout'
// Styles
import styles from './block-toolbar.mcss'

/**
 * Block Toolbar
 *
 */
const BlockToolbar = React.createClass({
  propTypes: {
    editorHasFocus: React.PropTypes.bool.isRequired,
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState () {
    return {
      open: false,
    }
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
    const {editorState} = this.props
    const selection = editorState.getSelection()
    const selectedBlockKey = selection.getStartKey()
    const selectedBlock = document.querySelector(`[data-block][data-offset-key^='${selectedBlockKey}']`)
    if (selectedBlock && this.positioner) {
      const blockRect = selectedBlock.getBoundingClientRect()
      const positionerParentRect = this.positioner.offsetParent.getBoundingClientRect()
      return {
        top: Math.floor(
          blockRect.top -
          positionerParentRect.top -
          10
        ),
      }
    }
    return {}
  },

  openToolbar (e) {
    e.preventDefault()
    this.setState({
      open: !this.state.open
    })
  },

  onClose (e) {
    this.setState({
      open: false
    })
  },

  render () {
    const {editorState, onChange} = this.props
    const {open, positionStyle} = this.state

    return (
      <div>
        <Popout placement='bottom' isOpened={open} closeOnOutsideClick={true} closeOnEsc onClose={this.onClose}>
          <div style={positionStyle} className={styles.positioner} ref={(r) => this.positioner = r}>
            <button className={styles.toggle} onClick={this.openToolbar}>
              ¶
              <span className={styles.toggleText}>View block elements</span>
            </button>
          </div>
          <div>
            I AM BUTTONS
          </div>
        </Popout>
      </div>
    )
  }
})

export default BlockToolbar
