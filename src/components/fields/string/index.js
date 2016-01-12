import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Import the display types
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Default from './display-default'
import Radio from './display-radio'
import Select from './display-select'

/**
 * Set up an object that holds all the `display_variants` by matching key
 * @type {Object}
 */
const displayVariants = {
  radio: Radio,
  select: Select
}

/**
 * Base class for the string field
 *
 * Sets up any common methods and UI across _all_ string fields and then
 * determines the `display_variant` class to include.
 *
 */
const StringBase = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    config: React.PropTypes.object,
    name: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list
  },

  /**
   * Common onChange handler for string fields
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange (e) {
    let value = e.target.value
    this.props.actions.edit(
      (val) => { return value }
    )
  },

  render () {
    let { config, errors, hint, label } = this.props
    // Determine the React class to render based on the display_variant configuration
    let StringDisplay = (config.display_variant) ? displayVariants[config.display_variant] : Default

    return (
      <div className='fm-field__base'>
        <FieldHeader label={label} hint={hint}/>
        <div className='fm-field__display'>
          <StringDisplay onChange={this.onChange} {...this.props}/>
        </div>
        {(errors) ? <FieldErrors errors={errors}/> : null}
      </div>
    )
  }
})

export default StringBase
