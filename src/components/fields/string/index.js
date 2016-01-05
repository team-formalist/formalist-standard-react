import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Import the display types
import standard from './display-standard'
import code from './display-code'

const displayTypes = {
  code: code
}

const StringBase = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    config: React.PropTypes.object,
    name: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  getInitialState () {
    let fieldDisplay = (this.props.config.display_as) ?
      displayTypes[this.props.config.display_as] : standard
    return { fieldDisplay }
  },

  onChange (e) {
    let value = e.target.value
    this.props.actions.edit(
      (val) => { return value }
    )
  },

  render () {
    let FieldDisplay = this.state.fieldDisplay
    return (
      <div className='field'>
        <h3 className='field__name'>{this.props.name.replace(/_/, ' ')}</h3>
        <FieldDisplay onChange={this.onChange} {...this.props}/>
      </div>
    )
  }
})

export default StringBase
export let StringFieldFactory = React.createFactory(StringBase)
