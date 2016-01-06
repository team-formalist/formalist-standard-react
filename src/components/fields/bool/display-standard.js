import React from 'react'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'

const BoolDisplayStandard = React.createClass({
  propTypes: {
    value: React.PropTypes.number,
    config: React.PropTypes.object
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

export default BoolDisplayStandard
