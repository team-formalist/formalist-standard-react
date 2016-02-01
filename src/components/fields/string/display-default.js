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
    error: React.PropTypes.bool,
    config: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  },

  render () {
    let { config, error, onChange, name, value } = this.props

    let stringFieldClassNames = classNames(
      'fm-field-string',
      'fm-input',
      'fm-input--text',
      optionClassNames('fm-field-string', config.display_options)
    )

    let type = (config.password) ? 'password' : 'text'

    return (
      <Input
        type={type}
        id={name}
        error={error}
        className={stringFieldClassNames}
        placeholder={config.placeholder}
        defaultValue={value}
        onChange={onChange} />
    )
  }
})

export default StringDisplayDefault
