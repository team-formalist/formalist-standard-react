import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { List } from 'immutable'
import fuzzy from 'fuzzy'
import extractComponent from '../../../utils/extract-component'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Popout from '../../ui/popout'
import Sortable from '../../ui/sortable'

// Import styles
import styles from './multi-selection-field.mcss'

/**
 * Default component for representing a "selected/selection" item
 * @param  {Object} props Taking the shape of:
 *
 * {
 *   option: { label: 'foo'}
 *  }
 *
 * I.e., expecting the option to have a `label` key with a string value.
 *
 * @return {ReactElement}
 */
const SelectDefault = ({option}) => (
  <div>
    {option.label}
  </div>
)

SelectDefault.propTypes = {
  option: React.PropTypes.shape({
    label: React.PropTypes.string
  })
}

/**
 * Selection field
 *
 * Handles a singular select of a set of pre-supplied options.
 *
 */
const SelectionField = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    name: React.PropTypes.string,
    config: React.PropTypes.object,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      hint: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      options: React.PropTypes.array,
      inline: React.PropTypes.bool,
      selector_label: React.PropTypes.string,
      render_option_as: React.PropTypes.string,
      render_selection_as: React.PropTypes.string
    }),
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: ImmutablePropTypes.list
  },

  /**
   * Enable parent to pass context
   */

  contextTypes: {
    globalConfig: React.PropTypes.object
  },

  /**
   * Default state, blank search
   * @return {Object}
   */
  getInitialState () {
    return {
      search: null
    }
  },

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange (value) {
    this.props.actions.edit(
      (val) => {
        return value
      }
    )
  },

  /**
   * On choose click, open selector
   * @return {Null}
   */
  onChooseClick (e) {
    e.preventDefault()
    this.toggleSelector()
  },

  /**
   * When selected item is removed
   * @param {Number} index Index of the item to remove
   * @return {Null}
   */
  onRemove (index) {
    const { value } = this.props
    this.onChange(value.delete(index))
  },

  /**
   * When selected item is removed
   * @return {Null}
   */
  onDrop (newOrder) {
    const value = this.props.value.slice()
    const updated = newOrder.map((index) => (
      value.get(index)
    ))
    this.onChange(List(updated))
  },

  /**
   * When a selection is made, trigger change and close the selector
   * @param {Number} id ID of the item to push in
   * @return {Null}
   */
  onSelection (id) {
    this.closeSelector()
    let { value } = this.props
    value = value || List()
    this.onChange(value.push(id))
  },

  /**
   * Open the selector popout
   * @return {Null}
   */
  openSelector () {
    this.refs.selector.openPopout()
  },

  /**
   * Close the selector popout
   * @return {Null}
   */
  closeSelector () {
    this.refs.selector.closePopout()
  },

  /**
   * On popout close, reset the search
   * @return {Null}
   */
  onPopoutClose () {
    this.setState({
      search: null
    })
  },

  /**
   * Toggle the selector popout
   * @return {Null}
   */
  toggleSelector () {
    this.refs.selector.togglePopout()
  },

  /**
   * On popout open, focus the search input
   * @return {Null}
   */
  onPopoutOpen () {
    this.refs.search.focus()
  },

  /**
   * Fired when search input is `change`d.
   * Set this.state.search to the value of the input
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchChange (e) {
    const search = e.target.value
    this.setState({
      search: search
    })
  },

  render () {
    const { attributes, config, errors, hint, label, name, value } = this.props
    const { instanceKey, search } = this.state
    const { options, placeholder, selector_label, render_selection_as, render_option_as } = attributes
    const hasErrors = (errors.count() > 0)

    // Set up field classes
    const fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline
      }
    )

    // Determine the selection/selected display components
    let Option = SelectDefault
    let Selection = SelectDefault

    // Extract them from the passed `config.components` if it exists
    if (config.components) {
      if (render_option_as) {
        Option = extractComponent(config.components, render_option_as) || Option
      }
      if (render_selection_as) {
        Selection = extractComponent(config.components, render_selection_as) || Selection
      }
    }

    // Determine selected options
    let selections = List()
    if (value) {
      selections = value.map((id) => (
        options.find((option) => (option.id === id))
      ))
    }
    const numberOfSelections = selections.count()

    // Remove any selected options
    let filteredOptions = options.filter((option) => {
      let include = true
      if (value) {
        include = !value.includes(option.id)
      }
      return include
    })
    // Filter options
    if (search) {
      filteredOptions = filteredOptions.filter((option) => {
        const values = Object.keys(option).map((key) => (
          String(option[key])
        ))
        const results = fuzzy.filter(search, values)
        return (results && results.length > 0)
      })
    }

    // Build the set of options
    const renderedOptions = filteredOptions.map((option) => {
      let onClick = function (e) {
        e.preventDefault()
        this.onSelection(option.id)
      }.bind(this)
      return (
        <button
          key={option.id}
          className={styles.optionButton}
          onClick={onClick}>
          <Option option={option}/>
        </button>
      )
    })

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors}/>
        </div>
        <div>
          <div className={styles.display}>
            <button
              className={styles.wrapper}
              onClick={this.onChooseClick}>
              <div className={styles.selectionPlaceholder}>
                <div>
                  {placeholder || 'Make a selection'}
                  {(numberOfSelections > 0) ? ` (${numberOfSelections} selected)` : null}
                </div>
              </div>
              <Popout ref='selector' placement='left' onClose={this.onPopoutClose} onOpen={this.onPopoutOpen}>
                <div className={styles.openSelectorButton}>
                  {selector_label || 'Select'}
                </div>
                <div className={styles.options}>
                  <input
                    ref='search'
                    type='search'
                    className={styles.search}
                    placeholder='Type to filter'
                    onChange={this.onSearchChange} />
                  <div className={styles.optionsList}>
                    {renderedOptions.length > 0 ? renderedOptions : <p className={styles.noResults}>No matching results</p>}
                  </div>
                </div>
              </Popout>
            </button>
          </div>
          {
            (numberOfSelections > 0)
            ? <div id={name} className={styles.selectedItems}>
              <Sortable canRemove onRemove={this.onRemove} onDrop={this.onDrop}>
                {selections.map((option, index) => <Selection key={`${instanceKey}_${index}_${option.id}`} option={option}/>)}
              </Sortable>
            </div>
            : null
          }
          {(hasErrors) ? <FieldErrors errors={errors}/> : null}
        </div>
      </div>
    )
  }
})

export default SelectionField
