import React from 'react'

const TextFieldStandard = React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  render () {
    return (
      <input type='text' defaultValue={this.props.value} onChange={this.props.onChange}/>
    )
  }
})

export default TextFieldStandard
