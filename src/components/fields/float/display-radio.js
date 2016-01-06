import React from 'react'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'

const IntDisplayRadio = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number,
    config: React.PropTypes.object
  },

  render () {
    let { config, name, value } = this.props
    let optionValues = config.option_values
    // Return nothing if we have no values
    if (optionValues && optionValues.count() === 0) {
      return false
    }

    let intFieldClassNames = classNames(
      'fm-field-int',
      'fm-field-int--radio',
      'fm-radio-group',
      optionClassNames('fm-field-int', config.display_options)
    )

    return (
      <div className={intFieldClassNames}>
        {optionValues.map((option, i) => {
          let key = `${name}-${i}`
          let optionValue = option.get(0)
          let optionLabel = option.get(1) || optionValue
          let checked = (value === optionValue)

          return (
            <div className='fm-radio-group__input'>
              <input key={key} id={key} type='radio' name={name} value={optionValue} defaultChecked={checked} onChange={this.props.onChange}/>
              <label htmlFor={key}>{optionLabel}</label>
            </div>
          )
        })}
      </div>
    )
  }
})

export default IntDisplayRadio
