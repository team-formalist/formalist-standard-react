import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'
import extractDisplayVariant from '../../../utils/extract-display-variant'

// Import the display types
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Default from './display-default'

// Import styles
import styles from './date-time.mcss'

/**
 * Set up an object that holds all the `display_variants` by matching key
 * @type {Object}
 */
export const availableDisplayVariants = {
  'default': Default
}

/**
 * Base class for the date field
 *
 * Sets up any common methods and UI across _all_ date fields and then
 * determines the `display_variant` class to include.
 *
 */
const DateBase = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    config: React.PropTypes.object,
    displayVariant: React.PropTypes.string,
    displayVariants: React.PropTypes.object,
    errors: ImmutablePropTypes.list,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  /**
   * Common onChange handler for string fields
   *
   * @param  {String} date Date as a dd/mm/yyyy formatted string
   */
  onChange (date) {
    this.props.actions.edit(
      (val) => { return date }
    )
  },

  render () {
    let { config, displayVariant, displayVariants, errors, hint, label, name } = this.props
    let hasErrors = (errors.count() > 0)
    let Display = extractDisplayVariant(
      displayVariant,
      Object.assign({}, displayVariants, availableDisplayVariants),
      'string'
    )

    return (
      <div className={styles.base}>
        <FieldHeader id={name} label={label} hint={hint} error={hasErrors}/>
        <div className={styles.display}>
          <Display
            onChange={this.onChange}
            className={classNames(
              optionClassNames(styles, config.display_options)
            )}
            error={hasErrors}
            {...this.props} />
        </div>
        {(hasErrors) ? <FieldErrors errors={errors}/> : null}
      </div>
    )
  }
})

export default DateBase
