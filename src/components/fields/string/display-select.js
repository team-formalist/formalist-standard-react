import React from 'react'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'

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
    let { config, value } = this.props

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
      <select className={stringFieldClassNames} defaultValue={value} onChange={this.props.onChange}>
        {optionValues.map((option, i) => {
          let value = option.get(0)
          let label = option.get(1) || optionValue
          return (
            <option key={i} value={value}>{label}</option>
          )
        })}
      </select>
    )
  }
})

export default StringDisplaySelect
