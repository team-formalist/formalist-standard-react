import React from 'react'
import {
  Entity,
  getVisibleSelectionRect,
  RichUtils,
} from 'draft-js'
import {getSelectedEntityKey} from '../utils'
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
class Toolbar extends React.Component {
  static propTypes = {
    editorHasFocus: React.PropTypes.bool.isRequired,
    editorState: React.PropTypes.object.isRequired,
    formatters: React.PropTypes.array,
    entities: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired,
  };

  state = {
    visible: false,
    forceVisible: false,
  };

  /**
   * Handle position and visibility of the toolbar
   */
  componentWillReceiveProps (nextProps) {
    const {editorState, editorHasFocus} = nextProps
    const {forceVisible} = this.state
    const selection = editorState.getSelection()

    // Determine visibility of the toolbar
    const selectionVisible = !selection.isCollapsed() && editorHasFocus

    this.setState({
      visible: forceVisible || selectionVisible,
    })

    if (selectionVisible) {
      // We have to wait a tick to calculate the position
      window.requestAnimationFrame(() => {
        this.setState({
          positionStyle: this.calculatePosition(),
        })
      })
    }
  }

  forceVisible = (force) => {
    this.setState({
      forceVisible: force,
    })
  };

  removeEntity = (entityKey) => {
    const {editorState, onChange} = this.props
    const selection = editorState.getSelection()
    onChange(
      RichUtils.toggleLink(editorState, selection, null)
    )
  };

  /**
   * Calculate the position of the toolbar based on the visible selection
   * and the position of the `positioner`s offsetParent.
   *
   * @return {Object} Description of the position/size of the positioner
   */
  calculatePosition = () => {
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
  };

  onPopoutClose = () => {
    this.setState({
      forceVisible: false,
    })
  };

  render () {
    const {editorState, formatters, entities, onChange} = this.props
    const {visible, forceVisible, positionStyle} = this.state
    let SelectedEntityHandler = null
    let selectedEntity

    // Retrieve the selected entity if there is one
    // and pull out any handlers we have available
    const selectedEntityKey = getSelectedEntityKey(editorState)
    if (selectedEntityKey) {
      selectedEntity = Entity.get(selectedEntityKey)
      const selectedEntityType = selectedEntity.getType()
      const {handler} = entities.find((entity) => entity.type.toLowerCase() === selectedEntityType.toLowerCase())
      SelectedEntityHandler = handler
    }

    // Only display if we have some `formatters` configured
    if (formatters.length > 0 || entities.length > 0) {
      // We need to cancel onMouseDown to avoid the buttons capturing focus
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return (
        <div>
          <Popout ref='popout' placement='top' isOpened={visible} closeOnOutsideClick onClose={this.onPopoutClose}>
            <div
              className={styles.positioner}
              ref={(r) => { this.positioner = r }}
              style={positionStyle}>
               &nbsp;
            </div>
            <div onMouseDown={(e) => {
              if (!forceVisible) {
                e.preventDefault()
              }
            }}>
              <InlineToolbarItems
                formatters={formatters}
                entities={entities}
                editorState={editorState}
                onChange={onChange}
              />
              {
                (SelectedEntityHandler)
                ? <div className={styles.entityWrapper}>
                  <SelectedEntityHandler
                    entityKey={selectedEntityKey}
                    editorState={editorState}
                    onChange={onChange}
                    forceVisible={this.forceVisible}
                    remove={this.removeEntity}
                  />
                </div>
                : null
              }
            </div>
          </Popout>
        </div>
      )
      /* eslint-enable react/jsx-no-bind */
    } else {
      return null
    }
  }
}

export default Toolbar
