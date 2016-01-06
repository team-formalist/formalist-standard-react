import React from 'react'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'

const IntDisplaySelect = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number,
    config: React.PropTypes.object
  },

  render () {
    let { config, value } = this.props
    let optionValues = config.option_values
    // Return nothing if we have no values
    if (optionValues && optionValues.count() === 0) {
      return false
    }
    let intFieldClassNames = classNames(
      'fm-field-int',
      'fm-field-int--select',
      'fm-select',
      optionClassNames('fm-field-int', config.display_options)
    )
    return (
      <select className={intFieldClassNames} defaultValue={value} onChange={this.props.onChange}>
        {optionValues.map((option, i) => {
          let optionValue = option.get(0)
          let optionLabel = option.get(1) || optionValue
          return (
            <option key={i} value={optionValue}>{optionLabel}</option>
          )
        })}
      </select>
    )
  }
})

export default IntDisplaySelect
