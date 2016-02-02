import React from 'react'

// Components
import DatePicker from '../../ui/date-picker'

const StringDisplayDefault = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    error: React.PropTypes.bool,
    config: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  },

  render () {
    let { config, error, onChange, name, value } = this.props

    return (
      <DatePicker
        id={name}
        error={error}
        placeholder={config.placeholder}
        defaultValue={value}
        onChange={onChange} />
    )
  }
})

export default StringDisplayDefault
