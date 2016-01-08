import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Import the display types
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Standard from './display-standard'

/**
 * Set up an object that holds all the `display_variants` by matching key
 * @type {Object}
 */
const displayVariants = {}

/**
 * Base class for the float field
 *
 * Sets up any common methods and UI across _all_ float fields and then
 * determines the `display_variant` class to include.
 *
 */
const BoolBase = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    config: React.PropTypes.object,
    name: React.PropTypes.string,
    value: React.PropTypes.bool,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list
  },

  /**
   * Common onChange handler for boolean
   *
   * @param  {Boolean} value True/false that updates the field
   */
  onChange (value) {
    this.props.actions.edit(
      (val) => { return value }
    )
  },

  render () {
    let { config, errors, hint } = this.props
    // Determine the React class to render based on the display_variant configuration
    let BoolDisplay = (config.display_variant) ? displayVariants[config.display_variant] : Standard

    return (
      <div className='fm-field__base'>
        <FieldHeader hint={hint}/>
        <div className='fm-field__display'>
          <BoolDisplay {...this.props}/>
        </div>
        {(errors) ? <FieldErrors errors={errors}/> : null}
      </div>
    )
  }
})

export default BoolBase
