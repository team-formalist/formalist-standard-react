import React from 'react'

// Components
import Input from '../../ui/input'

const StringDisplayDefault = React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    error: React.PropTypes.bool,
    config: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  },

  render () {
    let { config, error, onChange, name, value, className } = this.props
    let type = (config.password) ? 'password' : 'text'

    return (
      <Input
        type={type}
        id={name}
        error={error}
        className={className}
        placeholder={config.placeholder}
        defaultValue={value}
        onChange={onChange} />
    )
  }
})

export default StringDisplayDefault
