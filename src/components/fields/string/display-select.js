import { List } from 'immutable'
import React from 'react'

// Components
import Select from '../../ui/select'

const StringDisplaySelect = React.createClass({
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
    let { config, className, error, name, value } = this.props

    let optionValues = config.option_values
    // Return nothing if we have no values
    if (optionValues && optionValues.count() === 0) {
      return false
    }

    return (
      <Select
        id={name}
        className={className}
        defaultValue={value}
        placeholder={config.placeholder}
        error={error}
        onChange={this.props.onChange}>
          {optionValues.map((option, i) => {
            let value, label
            if (List.isList(option)) {
              value = option.get(0)
              label = option.get(1) || value
            } else {
              value = option
              label = option
            }
            return (
              <option key={i} value={value}>{label}</option>
            )
          })}
      </Select>
    )
  }
})

export default StringDisplaySelect
