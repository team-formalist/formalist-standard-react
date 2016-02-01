import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import isNumber from 'is-number'
import extractDisplayVariant from '../../../utils/extract-display-variant'

// Import the display types
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Default from './display-default'
import Radio from './display-radio'
import Select from './display-select'

// Import styles
import styles from './float.mcss'

/**
 * Set up an object that holds all the `display_variants` by matching key
 * @type {Object}
 */
export const displayVariants = {
  'default': Default,
  'radio': Radio,
  'select': Select
}

/**
 * Base class for the float field
 *
 * Sets up any common methods and UI across _all_ float fields and then
 * determines the `display_variant` class to include.
 *
 */
const FloatBase = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    config: React.PropTypes.object,
    name: React.PropTypes.string,
    value: React.PropTypes.number,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list
  },

  /**
   * Common onChange handler for float fields
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange (e) {
    let value = e.target.value
    if (isNumber(value)) {
      value = parseFloat(value)
      this.props.actions.edit(
        (val) => { return value }
      )
    }
  },

  render () {
    let { config, displayVariant, errors, hint, label, name } = this.props
    // Determine the React class to render based on the display_variant configuration
    let Display = extractDisplayVariant(
      displayVariant,
      Object.assign({}, this.props.displayVariants, displayVariants),
      'float'
    )

    return (
      <div className={styles.base}>
        <FieldHeader id={name} label={label} hint={hint}/>
        <div className={styles.display}>
          <Display onChange={this.onChange} {...this.props}/>
        </div>
        {(errors) ? <FieldErrors errors={errors}/> : null}
      </div>
    )
  }
})

export default FloatBase
