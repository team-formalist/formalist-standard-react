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
    let { config, name, className } = this.props

    return (
      <TextBox id={name} className={className} defaultValue={this.props.value} placeholder={config.placeholder} onChange={this.props.onChange}/>
    )
  }
})

export default StringDisplayDefault
