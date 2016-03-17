import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import RadioButton from '../../ui/radio-button'

// Import styles
import styles from './radio-buttons.mcss'

/**
 * Radio Buttons field
 */
const RadioButtons = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    name: React.PropTypes.string,
    config: React.PropTypes.object,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      hint: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      options: React.PropTypes.array.isRequired,
      inline: React.PropTypes.bool
    }),
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  /**
   * onChange handler
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
    let { attributes, errors, hint, label, name, value } = this.props
    let hasErrors = (errors.count() > 0)

    // Set up field classes
    let fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline
      }
    )

    // Extract options
    let options = attributes.options
    // Return nothing if we have no values
    if (options && options.length === 0) {
      return false
    }

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors}/>
        </div>
        <div className={styles.display}>
          {options.map((option, i) => {
            let optionValue, optionLabel
            if (Array.isArray(option)) {
              optionValue = option[0]
              optionLabel = option[1] || optionValue
            } else {
              optionValue = option
              optionLabel = option
            }
            let defaultChecked = (value && optionValue === value)
            return (
              <RadioButton
                key={i}
                name={name}
                label={optionLabel}
                error={hasErrors}
                value={optionValue}
                defaultChecked={defaultChecked}
                onChange={this.onChange} />
            )
          })}
          {(hasErrors) ? <FieldErrors errors={errors}/> : null}
        </div>
      </div>
    )
  }
})

export default RadioButtons
