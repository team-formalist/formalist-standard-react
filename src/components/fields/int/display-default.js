import React from 'react'
import numberIsInteger from 'number-is-integer'

// Components
import Input from '../../ui/input'

const IntDisplayDefault = React.createClass({
  propTypes: {
    value: React.PropTypes.number,
    config: React.PropTypes.object
  },

  render () {
    let { className, config, name } = this.props

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
        id={name}
        className={className}
        type='number'
        defaultValue={this.props.value}
        placeholder={config.placeholder}
        onChange={this.props.onChange}
        {...numberProps}/>
    )
  }
})

export default IntDisplayDefault
