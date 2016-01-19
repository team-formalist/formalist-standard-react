import React from 'react'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'

// Components
import Input from '../../ui/input'

const StringDisplayDefault = React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    config: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  },

  render () {
    let { config, name } = this.props

    let stringFieldClassNames = classNames(
      'fm-field-string',
      'fm-input',
      'fm-input--text',
      optionClassNames('fm-field-string', config.display_options)
    )

    return (
      <Input id={name} className={stringFieldClassNames} type='text' defaultValue={this.props.value} onChange={this.props.onChange}/>
    )
  }
})

export default StringDisplayDefault
