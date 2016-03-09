import React from 'react'

// Components
import Input from '../../ui/input'

const StringDisplayDefault = React.createClass({

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
    let { config, error, onChange, name, value, className } = this.props
    const { placeholder, password } = config
    let type = (password) ? 'password' : 'text'

    return (
      <Input
        type={ type }
        id={ name }
        error={ error }
        className={ className }
        placeholder={ placeholder }
        defaultValue={ value }
        onChange={ onChange }
      />
    )
  }
})

export default StringDisplayDefault
