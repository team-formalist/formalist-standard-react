import React from 'react'
import {
  RichUtils,
  getDefaultKeyBinding,
  getVisibleSelectionRect,
  KeyBindingUtil,
} from 'draft-js';

// Components
import Popout from '../popout'

const {hasCommandModifier} = KeyBindingUtil


const InlineToolbar = React.createClass({
  propTypes: {
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    inlineButtons: React.PropTypes.array,
    entityButtons: React.PropTypes.array,
  },

  getInitialState () {
    return {
      visible: false,
    }
  },

  componentWillReceiveProps (nextProps) {
    const {editorState} = nextProps
    const selection = editorState.getSelection()
    const selectionVisible = !selection.isCollapsed() && selection.hasFocus

    this.setState({
      visible: selectionVisible
    })
  },

  calculatePosition () {
    const {visible} = this.state
    if (visible) {
      const selectionRect = getVisibleSelectionRect(window)
      // Need to calculate offset
      if (selectionRect && this.positioner) {
        const positionerRect = this.positioner.offsetParent.getBoundingClientRect()
        return {
          position: 'absolute',
          left: selectionRect.left - positionerRect.left,
          top: selectionRect.top - positionerRect.top,
          width: selectionRect.width,
          height: 0,
        }
      }
    }
    return {
      position: 'absolute',
    }
  },

  render () {
    const {editorState, onChange} = this.props
    const {visible} = this.state
    let style = this.calculatePosition()

    return (
      <div>
        <Popout ref='popout' placement='top' isOpened={visible}>
          <div ref={(r) => this.positioner = r} style={style}>&nbsp;</div>
          <p>Popout content!</p>
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
