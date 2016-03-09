import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import isNumber from 'is-number'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'
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
export const availableDisplayVariants = {
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
    displayVariant: React.PropTypes.string,
    displayVariants: React.PropTypes.object,
    errors: ImmutablePropTypes.list,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.number
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
    let { config, displayVariant, displayVariants, errors, hint, label, name } = this.props
    let hasErrors = (errors.count() > 0)
    let { display_options } = config

    let Display = extractDisplayVariant(
      displayVariant,
      Object.assign({}, displayVariants, availableDisplayVariants),
      'float'
    )

    return (
      <div className={ styles.base }>
        <FieldHeader id={ name } label={ label } hint={ hint } error={ hasErrors }/>
        <div className={ styles.display }>
          <Display
            onChange={ this.onChange }
            className={ classNames(
              optionClassNames(styles, display_options)
            ) }
            error={ hasErrors }
            { ...this.props }
          />
        </div>
        { (hasErrors) ? <FieldErrors errors={ errors }/> : null }
      </div>
    )
  }
})

export default FloatBase
