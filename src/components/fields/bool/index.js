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
import styles from './bool.mcss'

/**
 * Set up an object that holds all the `display_variants` by matching key
 * @type {Object}
 */
export const availableDisplayVariants = {
  'default': Default
}

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
    displayVariant: React.PropTypes.string,
    displayVariants: React.PropTypes.object,
    errors: ImmutablePropTypes.list,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.bool
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
    let { config, displayVariant, displayVariants, errors, hint } = this.props
    const { display_options } = config
    let hasErrors = (errors.count() > 0)

    // Determine the React class to render based on the display_variant configuration
    let Display = extractDisplayVariant(
      displayVariant,
      Object.assign({}, displayVariants, availableDisplayVariants),
      'bool'
    )

    return (
      <div className={ styles.base }>
        <FieldHeader hint={ hint } error={ hasErrors }/>
        <div className={ styles.display }>
          <Display
            onChange={ this.onChange }
            className={ classNames(
              optionClassNames(styles, display_options)
            ) }
            error={ hasErrors }
            {...this.props} />
        </div>
        { (hasErrors) ? <FieldErrors errors={ errors }/> : null }
      </div>
    )
  }
})

export default BoolBase
