import {getDefaultKeyBinding, EditorState, KeyBindingUtil, Modifier, RichUtils, SelectionState} from 'draft-js'


function autoList (config = {}) {
  let previousKey = null

  return {

    keyBindingFn (e) {
      const currentKey = e.keyCode
      // currentKey = space, previousKey = *
      if (currentKey === 32 && previousKey === 56) {
        previousKey = currentKey
        return 'list-unordered'
      }
      previousKey = currentKey
      return getDefaultKeyBinding(e)
    },

    handleKeyCommand (command, { getEditorState, setEditorState }) {
      if (command === 'list-unordered') {
        let editorState = getEditorState()
        let content = editorState.getCurrentContent()

        // Retrieve the current block
        const selection = editorState.getSelection()
        const blockKey = selection.getStartKey()
        let block = content.getBlockForKey(blockKey)

        // Check if it matches our criteria for creating a list
        if (block.getDepth() === 0 && block.getText() === "*") {
          // Convert the existing block to an unordered list
          editorState = RichUtils.toggleBlockType(editorState, 'unordered-list-item')
          content = editorState.getCurrentContent()
          block = content.getBlockForKey(blockKey)

          // Select the entire block
          const blockSelection = new SelectionState({
            anchorKey: blockKey,
            anchorOffset: 0,
            focusKey: blockKey,
            focusOffset: block.getLength(),
          })

          // Replace with the text with either nothing (if we created a list)
          // or the existing content
          content = Modifier.replaceText(
            content,
            blockSelection,
            ''
          )
        } else {
          // Insert a space
          content = Modifier.insertText(
            content,
            selection,
            ' '
          )
        }
        editorState = EditorState.push(editorState, content)
        editorState = EditorState.forceSelection(editorState, content.getSelectionAfter())
        setEditorState(editorState)
        return true
      }
      return false
    }
  }
}

export default autoList
