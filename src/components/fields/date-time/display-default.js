import React from 'react'

// Components
import DateTimePicker from '../../ui/date-time-picker'

const StringDisplayDefault = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    error: React.PropTypes.bool,
    config: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  },

  render () {
    let { className, config, error, name, onChange, value } = this.props

    return (
      <DateTimePicker
        id={name}
        className={className}
        error={error}
        placeholder={config.placeholder}
        defaultValue={value}
        onChange={onChange} />
    )
  }
})

export default StringDisplayDefault
