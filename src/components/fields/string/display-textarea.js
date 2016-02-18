import React from 'react'

// Components
import TextBox from '../../ui/text-box'

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
    let { config, error, name, className } = this.props

    return (
      <TextBox
        id={name}
        className={className}
        error={error}
        defaultValue={this.props.value}
        placeholder={config.placeholder}
        boxSize={config.box_size}
        onChange={this.props.onChange} />
    )
  }
})

export default StringDisplayDefault
