import React from 'react'
import isNumber from 'is-number'

// Components
import Input from '../../ui/input'

const FloatDisplayDefault = React.createClass({
  propTypes: {
    value: React.PropTypes.number,
    config: React.PropTypes.object
  },

  render () {
    let { className, config, error, name } = this.props

    // Configure specific number attributes from the config
    let numberProps = {}
    let numberConfig = ['step', 'min', 'max']
    numberConfig.forEach((option) => {
      let value = config[option]
      if (value && (value === 'any' || isNumber(value))) {
        numberProps[option] = value
      }
    })

    return (
      <Input
        id={name}
        className={className}
        error={error}
        type='number'
        defaultValue={this.props.value}
        placeholder={config.placeholder}
        onChange={this.props.onChange}
        {...numberProps}/>
    )
  }
})

export default FloatDisplayDefault
