import React from 'react'
import classNames from 'classnames'
import numberIsInteger from 'number-is-integer'
import optionClassNames from '../../../utils/option-class-names'

const IntDisplayStandard = React.createClass({
  propTypes: {
    value: React.PropTypes.number,
    config: React.PropTypes.object
  },

  render () {
    let { config } = this.props

    let intFieldClassNames = classNames(
      'fm-field-int',
      'fm-input',
      'fm-input--text',
      optionClassNames('fm-field-int', config.display_options)
    )

    // Configure specific number props from the config
    let numberProps = {}
    let numberConfig = ['step', 'min', 'max']
    numberConfig.forEach((option) => {
      let value = config[option]
      if (value && numberIsInteger(value)) {
        numberProps[option] = value
      }
    })

    return (
      <input className={intFieldClassNames} type='number' defaultValue={this.props.value} onChange={this.props.onChange} {...numberProps}/>
    )
  }
})

export default IntDisplayStandard
