import { List } from 'immutable'
import React from 'react'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'

// Components
import Select from '../../ui/select'

const StringDisplaySelect = React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    config: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  },

  render () {
    let { config, error, name, value } = this.props

    let optionValues = config.option_values
    // Return nothing if we have no values
    if (optionValues && optionValues.count() === 0) {
      return false
    }

    let stringFieldClassNames = classNames(
      'fm-field-string',
      'fm-field-string--select',
      'fm-select',
      optionClassNames('fm-field-string', config.display_options)
    )

    return (
      <Select
        id={name}
        className={stringFieldClassNames}
        defaultValue={value}
        error={error}
        onChange={this.props.onChange}>
          {optionValues.map((option, i) => {
            let value, label
            if (List.isList(option)) {
              value = option.get(0)
              label = option.get(1) || value
            } else {
              value = option
              label = value
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
