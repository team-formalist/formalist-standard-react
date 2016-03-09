import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'
import extractDisplayVariant from '../../../utils/extract-display-variant'

// Import the display types
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Default from './display-default'
import Radio from './display-radio'
import Select from './display-select'
import Textarea from './display-textarea'

// Import styles
import styles from './string.mcss'

/**
 * Set up an object that holds all the `display_variants` by matching key
 * @type {Object}
 */
export const availableDisplayVariants = {
  'default': Default,
  'radio': Radio,
  'select': Select,
  'textarea': Textarea
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
    displayVariant: React.PropTypes.string,
    displayVariants: React.PropTypes.object,
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
    let { config, displayVariant, displayVariants, errors, hint, label, name } = this.props
    const { inline, display_options } = config
    let hasErrors = (errors.count() > 0)
    let Display = extractDisplayVariant(
      displayVariant,
      Object.assign({}, displayVariants, availableDisplayVariants),
      'string'
    )
    let fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: inline
      }
    )

    return (
      <div className={ fieldClassNames }>
        <div className={ styles.header} >
          <FieldHeader id={ name } label={ label } hint={ hint } error={ hasErrors }/>
        </div>
        <div className={ styles.display }>
          <Display
            onChange={ this.onChange }
            className={ classNames(
              optionClassNames(styles, display_options)
            ) }
            error={ hasErrors }
            { ...this.props }
          />
          { (hasErrors) ? <FieldErrors errors={ errors }/> : null }
        </div>
      </div>
    )
  }
})

export default StringBase
