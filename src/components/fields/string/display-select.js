import React from 'react'

const StringDisplaySelect = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    config: React.PropTypes.object
  },

  render () {
    let { config, value } = this.props
    let optionValues = config.option_values
    // Return nothing if we have no values
    if (optionValues && optionValues.count() === 0) {
      return false
    }
    return (
      <select className='fm-field-string fm-field-string--select' defaultValue={value} onChange={this.props.onChange}>
        {optionValues.map((option, i) => {
          let value = option.get(0)
          let label = option.get(1)
          return (
            <option key={i} value={value}>{label}</option>
          )
        })}
      </select>
    )
  }
})

export default StringDisplaySelect
