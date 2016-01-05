import React from 'react'

const TextFieldCode = React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  render () {
    return (
      <div>
        <p>{this.props.value}</p>
        <input className='code' type='text' defaultValue={this.props.value} onChange={this.props.onChange}/>
      </div>
    )
  }
})

export default TextFieldCode
