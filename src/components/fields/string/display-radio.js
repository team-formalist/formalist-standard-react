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
    const { option_values } = config
    // Return nothing if we have no values
    if (option_values && option_values.count() === 0) {
      return false
    }

    return (
      <div className={ className }>
        { option_values.map((option, i) => {
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
              key={ i }
              name={ name }
              label={ optionLabel }
              error={ error }
              value={ optionValue }
              defaultChecked={ defaultChecked }
              onChange={ onChange }
            />
          )
        }) }
      </div>
    )
  }
})

export default StringDisplayRadio
