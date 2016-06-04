import React from 'react'
import {
  RichUtils,
  getDefaultKeyBinding,
  getVisibleSelectionRect,
  KeyBindingUtil,
} from 'draft-js';

// Components
import Popout from '../popout'
import InlineToolbarItems from './items'

const {hasCommandModifier} = KeyBindingUtil

import styles from './rich-text-editor-inline-toolbar.mcss'

function withinBounds(rect, bounds) {
   return (
    rect.left >= bounds.left &&
    rect.top >= bounds.top &&
    rect.right <= bounds.right &&
    rect.bottom <= bounds.bottom
  )
}

const InlineToolbar = React.createClass({
  propTypes: {
    editorHasFocus: React.PropTypes.bool.isRequired,
    editorState: React.PropTypes.object.isRequired,
    entityButtons: React.PropTypes.array,
    inlineButtons: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState () {
    return {
      visible: false,
    }
  },

  componentWillReceiveProps (nextProps) {
    const {editorState, editorHasFocus} = nextProps
    const selection = editorState.getSelection()
    const selectionVisible = !selection.isCollapsed() && editorHasFocus

    this.setState({
      visible: selectionVisible
    })

    if (selectionVisible) {
      // We have to wait a tick to calculate the position
      window.requestAnimationFrame(() => {
        this.setState({
          positionStyle: this.calculatePosition()
        })
      })
    }
  },

  calculatePosition () {
    const {visible} = this.state
    if (visible) {
      const selectionRect = getVisibleSelectionRect(window)
      if (selectionRect && this.positioner) {
        const positionerRect = this.positioner.offsetParent.getBoundingClientRect()
        return {
          left: selectionRect.left - positionerRect.left,
          top: selectionRect.top - positionerRect.top,
          width: selectionRect.width,
        }
      }
    }
    return {
      left: 0,
      right: 0,
      width: 0,
    }
  },

  render () {
    const {editorState, onChange} = this.props
    const {visible, positionStyle} = this.state

    return (
      <div>
        <Popout ref='popout' placement='top' isOpened={visible} closeOnOutsideClick={true}>
          <div className={styles.positioner} ref={(r) => this.positioner = r} style={positionStyle}>&nbsp;</div>
          <div>
            <InlineToolbarItems editorState={editorState} onChange={onChange}/>
          </div>
        </Popout>
      </div>
    )
  }
})


function handleKeyCommand (command, { getEditorState, setEditorState }) {
  switch (command) {
    case 'bold':
      setEditorState(
        RichUtils.toggleInlineStyle(getEditorState(), 'BOLD')
      )
      return true
    case 'italic':
      setEditorState(
        RichUtils.toggleInlineStyle(getEditorState(), 'ITALIC')
      )
      return true
    case 'underline':
      setEditorState(
        RichUtils.toggleInlineStyle(getEditorState(), 'UNDERLINE')
      )
      return true
  }
  return false
}

export default function inlineToolbarPlugin (options = {}) {
  return {
    handleKeyCommand,
    // Wrapper for the toolbar to mix in curried options
    InlineToolbar: (props, children) => {
      props = Object.assign({}, {something: "else"}, props)
      return (
        <InlineToolbar {...props}/>
      )
    }
  }
}
