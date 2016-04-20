import {getDefaultKeyBinding, EditorState, Modifier, RichUtils, SelectionState} from 'draft-js'

const UL_FULL_REGEX = /^(\*|\-)\s$/
const UL_INTERCEPT_REGEX = /^(\*|\-)$/
const OL_FULL_REGEX = /^\d\.\s$/
const OL_INTERCEPT_REGEX = /^\d\.$/

const characterMapping = {
  106: '*',
  110: '.',
  189: '-',
  190: '.',
  'shift': {
    56: '*',
  }
}

function trackCharacters (history = [], e) {
  const {keyCode, shiftKey} = e

  if (history.length > 2) {
    history = history.slice(1)
  } else {
    history = history.slice()
  }

  // Map the keyCodes to characters we care about
  let character = (shiftKey) ? characterMapping.shift[e.keyCode] : characterMapping[e.keyCode]
  if (!character) {
    character = String.fromCharCode(e.keyCode)
  }
  history.push(character)
  return history
}

function autoList (config = {}) {
  let previousKey = null
  let keyCharsHistory = []

  return {

    keyBindingFn (e) {
      keyCharsHistory = trackCharacters(keyCharsHistory, e)
      if (UL_FULL_REGEX.test(keyCharsHistory.slice(-2).join(''))) {
        return 'autolist-unordered'
      } else if (OL_FULL_REGEX.test(keyCharsHistory.join(''))) {
        return 'autolist-ordered'
      }
      return getDefaultKeyBinding(e)
    },

    handleReturn (e, { getEditorState, setEditorState }) {
      let editorState = getEditorState()
      let content = editorState.getCurrentContent()

      // Retrieve current block
      const selection = editorState.getSelection()
      const blockKey = selection.getStartKey()
      let block = content.getBlockForKey(blockKey)
      const blockType = block.getType()

      if (/list-item/.test(blockType) && block.getText() === '') {
        editorState = RichUtils.toggleBlockType(editorState, blockType)
        content = editorState.getCurrentContent()
        editorState = EditorState.forceSelection(editorState, content.getSelectionAfter())
        setEditorState(editorState)
        return true
      }

      return false
    },

    handleKeyCommand (command, { getEditorState, setEditorState }) {
      if (/autolist/.test(command)) {
        let listType = 'unordered-list-item'
        let listTest = (text) => UL_INTERCEPT_REGEX.test(text)
        if (command === 'autolist-ordered') {
          listType = 'ordered-list-item'
          listTest = (text) => OL_INTERCEPT_REGEX.test(text)
        }

        let editorState = getEditorState()
        let content = editorState.getCurrentContent()

        // Retrieve block that's selected
        const selection = editorState.getSelection()
        const blockKey = selection.getStartKey()
        let block = content.getBlockForKey(blockKey)

        // Check if it matches our criteria for creating a list
        if (block.getType() === 'unstyled' && block.getDepth() === 0 && listTest(block.getText())) {
          // Convert the existing block to an unordered list
          editorState = RichUtils.toggleBlockType(editorState, listType)
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
          // We've intercepted the key press, so we needs to manually insert a
          // space
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
