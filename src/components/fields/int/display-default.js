import React from 'react'
import numberIsInteger from 'number-is-integer'

// Components
import Input from '../../ui/input'

const IntDisplayDefault = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    config: React.PropTypes.object,
    error: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number
  },

  render () {
    let { className, config, error, name, value, onChange } = this.props
    const { placeholder } = config

    // Configure specific number attributes from the config
    let numberProps = {}
    let numberConfig = ['step', 'min', 'max']
    numberConfig.forEach((option) => {
      let value = config[option]
      if (value && numberIsInteger(value)) {
        numberProps[option] = value
      }
    })

    return (
      <Input
        id={ name }
        className={ className }
        error={ error }
        type='number'
        defaultValue={ value }
        placeholder={ placeholder }
        onChange={ onChange }
        { ...numberProps }
      />
    )
  }
})

export default IntDisplayDefault
