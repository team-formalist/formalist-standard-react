import React from 'react'

// Components
import TextBox from '../../ui/text-box'

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
    let { config, error, name, className, onChange, value } = this.props
    const { placeholder, box_size } = config

    return (
      <TextBox
        id={ name }
        className={ className }
        error={ error }
        defaultValue={ value }
        placeholder={ placeholder }
        boxSize={ box_size }
        onChange={ onChange }
      />
    )
  }
})

export default StringDisplayDefault
