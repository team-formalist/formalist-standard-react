import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import isNumber from 'is-number'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Input from '../../ui/input'

// Import styles
import styles from './number-field.mcss'

/**
 * Number field
 */
const NumberField = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      hint: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      inline: React.PropTypes.bool,
      step: React.PropTypes.number,
      min: React.PropTypes.number,
      max: React.PropTypes.number
    }),
    name: React.PropTypes.string,
    config: React.PropTypes.object,
    value: React.PropTypes.number,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list
  },

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange (e) {
    let value = e.target.value
    if (isNumber(value)) {
      value = parseFloat(value)
    } else {
      value = null
    }
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

    // Set up input classes
    let inputClassNames = classNames({
      [`${styles.code}`]: attributes.code
    })

    // Configure specific number attributes from the attributes
    let numberProps = {}
    let numberConfig = ['step', 'min', 'max']
    numberConfig.forEach((option) => {
      let value = attributes[option]
      if (value && isNumber(value)) {
        numberProps[option] = value
      }
    })

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors}/>
        </div>
        <div className={styles.display}>
          <Input
            type='number'
            id={name}
            error={hasErrors}
            className={inputClassNames}
            placeholder={attributes.placeholder}
            defaultValue={value}
            onChange={this.onChange}
            {...numberProps} />
          {(hasErrors) ? <FieldErrors errors={errors}/> : null}
        </div>
      </div>
    )
  }
})

export default NumberField
