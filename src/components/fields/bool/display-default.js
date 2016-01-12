import React from 'react'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'

/**
 * Default display class for `bool` type fields. Shows the field as a checkbox
 * followed by "Truthy question <label>"
 */
const BoolDisplayDefault = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.bool,
    config: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  render () {
    let { config, name, label, value } = this.props

    let boolFieldClassNames = classNames(
      'fm-field-bool',
      'fm-checkbox',
      optionClassNames('fm-field-bool', config.display_options)
    )

    let checkboxLabel = config.question_text || label

    return (
      <div className={boolFieldClassNames}>
        <input
          type='checkbox'
          id={name}
          className='fm-checkbox__input'
          defaultChecked={value}
          onChange={
            (e) => {
              return this.props.onChange(e.target.checked)
            }
          } />
        <label htmlFor={name}>{checkboxLabel}</label>
      </div>
    )
  }
})

export default BoolDisplayDefault
