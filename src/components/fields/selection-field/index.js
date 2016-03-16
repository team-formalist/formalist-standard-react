import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { List } from 'immutable'
import fuzzy from 'fuzzy'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Popout from '../../ui/popout'

// Import styles
import styles from './selection-field.mcss'


// DefaultSelected
const SelectedDefault = ({option}) => (
  <div className={styles.selectedDefault}>
    {option.label}
  </div>
)

// DefaultSelector
const SelectionDefault = ({option}) => (
  <div className={styles.selectionDefault}>
    {option.label}
  </div>
)


/**
 * Selection field
 */
const SelectionField = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    name: React.PropTypes.string,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      hint: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      options: React.PropTypes.array,
      inline: React.PropTypes.bool,
      select_label: React.PropTypes.string
    }),
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  getInitialState () {
    return {
      search: null,
      options: List(this.props.attributes.options)
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.attributes.options) {
      this.setState({
        options: List(nextProps.attributes.options)
      })
    }
  },

  /**
   * Common onChange handler for string fields
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

  onChooseClick (e) {
    e.preventDefault()
    this.openSelector()
  },

  onRemoveClick (e) {
    e.preventDefault()
    this.onChange(null)
  },

  onSelection (id) {
    this.closeSelector()
    this.onChange(id)
  },

  openSelector () {
    this.refs.selector.openPopout()
  },

  closeSelector () {
    this.refs.selector.closePopout()
  },

  onPopoutClose () {
    this.setState({
      search: null
    })
  },

  onPopoutOpen () {
    this.refs.search.focus()
  },

  onSearchChange (e) {
    const search = e.target.value
    this.setState({
      search: search
    })
  },

  render () {
    const { attributes, errors, hint, label, name, value } = this.props
    const { options, search } = this.state
    const { placeholder, select_label } = attributes
    const hasErrors = (errors.count() > 0)

    // Set up field classes
    const fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline
      }
    )

    // Determine selected option
    const selectedOption = options.find((option) => (
      option.id === value
    ))

    // Filter options
    let filteredOptions = options
    if (search) {
      filteredOptions = options.filter((option) => {
        const values = Object.keys(option).map((key) => (
          String(option[key])
        ))
        const results = fuzzy.filter(search, values)
        return (results && results.count() > 0)
      })
    }

    // Build the set of options
    const selections = filteredOptions.map((option) => (
      <button
        className={styles.selectionButton}
        onClick={(e) => {
          e.preventDefault()
          this.onSelection(option.id)
        }}>
        <SelectionDefault option={option}/>
      </button>
    ))

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors}/>
        </div>
        <div className={styles.display}>
          { (selectedOption) ?
            <div className={styles.wrapper}>
              <div className={styles.selection}>
                <SelectedDefault option={selectedOption}/>
              </div>
              <button className={styles.remove} onClick={this.onRemoveClick}>
                <span className={styles.removeText}>Remove</span>
                <div className={styles.removeX}>×</div>
              </button>
            </div>
            :
            <button
              className={styles.wrapper}
              onClick={this.onChooseClick}>
              <div className={styles.selectionPlaceholder}>
                { placeholder || 'Make a selection' }
              </div>
              <Popout ref='selector' placement='left' closeOnEsc onClose={this.onPopoutClose} onOpen={this.onPopoutOpen}>
                <div className={styles.openSelectionsButton}>
                  { select_label || 'Select' }
                </div>
                <div className={styles.selections}>
                  <input
                    ref='search'
                    type='search'
                    className={styles.search}
                    placeholder="Type to filter"
                    onChange={this.onSearchChange} />
                  <div className={styles.selectionsList}>
                    { selections.count() > 0 ? selections : <p className={styles.noResults}>No matching results</p> }
                  </div>
                </div>
              </Popout>
            </button>
          }
          {(hasErrors) ? <FieldErrors errors={errors}/> : null}
        </div>
      </div>
    )
  }
})

export default SelectionField
