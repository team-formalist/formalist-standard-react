import React from 'react'
import {
  Entity,
  getVisibleSelectionRect,
} from 'draft-js'
import {getSelectedEntityKey, getSelectedEntityTypes} from '../utils'
// Components
import Popout from '../../popout'
import InlineToolbarItems from './items'
// Styles
import styles from './toolbar.mcss'

/**
 * Inline Toolbar
 *
 * An inline toolbar for the `rich-text-editor` that pops out when text is
 * selected.
 *
 * It uses the common <Popout/> UI component so there’s a slightly strange dance
 * to set the position using a reference element `this.refs.positioner`.
 *
 */
const Toolbar = React.createClass({
  propTypes: {
    editorHasFocus: React.PropTypes.bool.isRequired,
    editorState: React.PropTypes.object.isRequired,
    formatters: React.PropTypes.array,
    entities: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState () {
    return {
      visible: false,
    }
  },

  /**
   * Handle position and visibility of the toolbar
   */
  componentWillReceiveProps (nextProps) {
    const {editorState, editorHasFocus} = nextProps
    const selection = editorState.getSelection()

    // Determine visibility of the toolbar
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

  /**
   * Calculate the position of the toolbar based on the visible selection
   * and the position of the `positioner`s offsetParent.
   *
   * @return {Object} Description of the position/size of the positioner
   */
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
    const {editorState, formatters, entities, onChange} = this.props
    const {visible, positionStyle} = this.state
    let SelectedEntityHandler = null
    let selectedEntity

    // Get selected entity _types_
    // This should prob be in a separate component
    const selectedEntityTypes = getSelectedEntityTypes(editorState)
    console.log('selectedEntityTypes', (selectedEntityTypes) ? selectedEntityTypes.toJS() : selectedEntityTypes)

    // Retrieve the selected entity if there is one
    // and pull out any handlers we have available
    const selectedEntityKey = getSelectedEntityKey(editorState)
    if (selectedEntityKey) {
      selectedEntity = Entity.get(selectedEntityKey)
      const selectedEntityType = selectedEntity.getType()
      const {handler} = entities.find((entity) => entity.type.toLowerCase() === selectedEntityType.toLowerCase())
      SelectedEntityHandler = handler
    }

    console.log('!!!', SelectedEntityHandler)

    // Only display if we have some `formatters` configured
    if (formatters.length > 0 || entities.length > 0) {
      // We need to cancel onMouseDown to avoid the buttons capturing focus
      return (
        <div>
          <Popout ref='popout' placement='top' isOpened={visible} closeOnOutsideClick={true}>
            <div className={styles.positioner} ref={(r) => this.positioner = r} style={positionStyle}>&nbsp;</div>
            <div onMouseDown={(e) => e.preventDefault()}>
              <InlineToolbarItems formatters={formatters} editorState={editorState} onChange={onChange}/>
              {
                (SelectedEntityHandler)
                ? <SelectedEntityHandler entity={selectedEntity} editorState={editorState} onChange={onChange}/>
                : null
              }
            </div>
          </Popout>
        </div>
      )
    } else {
      return null
    }
  }
})

export default Toolbar
