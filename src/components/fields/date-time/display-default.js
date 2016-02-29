import React from 'react'

// Components
import DateTimePicker from '../../ui/date-time-picker'

const StringDisplayDefault = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    config: React.PropTypes.object,
    error: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string
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
