import { List } from 'immutable'
import React from 'react'

// Components
import RadioButton from '../../ui/radio-button'

const StringDisplayRadio = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    config: React.PropTypes.object,
    error: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  render () {
    let { config, className, error, onChange, name, value } = this.props

    let optionValues = config.option_values
    // Return nothing if we have no values
    if (optionValues && optionValues.count() === 0) {
      return false
    }

    return (
      <div className={className}>
        {optionValues.map((option, i) => {
          let optionValue, optionLabel
          if (List.isList(option)) {
            optionValue = option.get(0)
            optionLabel = option.get(1) || optionValue
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
              error={error}
              value={optionValue}
              defaultChecked={defaultChecked}
              onChange={onChange} />
          )
        })}
      </div>
    )
  }
})

export default StringDisplayRadio
