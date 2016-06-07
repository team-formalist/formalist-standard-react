import React from 'react'
import {
  getVisibleSelectionRect,
} from 'draft-js'
// Components
import Popout from '../../popout'
import StandardItems from './standard-items'
// Styles
import styles from './block-toolbar.mcss'

/**
 * The block item mappings
 * @type {Array}
 */
const blockItemsMapping = [
  {
    type: 'unstyled',
    label: 'Paragraph',
  },
  {
    type: 'paragraph',
    label: 'Paragraph',
  },
  {
    type: 'header-one',
    label: 'Heading 1',
  },
  {
    type: 'header-two',
    label: 'Heading 2',
  },
  {
    type: 'header-three',
    label: 'Heading 3',
  },
  {
    type: 'header-four',
    label: 'Heading 4',
  },
  {
    type: 'header-five',
    label: 'Heading 5',
  },
  {
    type: 'header-six',
    label: 'Heading 6',
  },
  {
    type: 'unordered-list-item',
    label: 'UL',
  },
  {
    type: 'ordered-list-item',
    label: 'OL',
  },
  {
    type: 'blockquote',
    label: 'Blockquote',
  },
  {
    type: 'code-block',
    label: 'Code',
  },
]

/**
 * Block Toolbar
 *
 */
const BlockToolbar = React.createClass({
  propTypes: {
    blockFormatters: React.PropTypes.array,
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
          8
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
    const {blockFormatters, editorState, onChange} = this.props
    const {open, positionStyle} = this.state

    const blockItems = blockItemsMapping.filter((item) => blockFormatters.indexOf(item.type) > -1)

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
            <StandardItems items={blockItems} editorState={editorState} onChange={onChange}/>
          </div>
        </Popout>
      </div>
    )
  }
})

export default BlockToolbar
