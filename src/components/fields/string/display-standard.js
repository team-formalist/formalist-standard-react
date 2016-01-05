import React from 'react'
import classNames from 'classnames'
import optionClassNames from '../../../utils/option-class-names'

const StringDisplayStandard = React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    config: React.PropTypes.object
  },

  render () {
    let { config } = this.props
    let stringFieldClassNames = classNames(
      'fm-field-string',
      optionClassNames('fm-field-string', config.display_options)
    )

    return (
      <input className={stringFieldClassNames} type='text' defaultValue={this.props.value} onChange={this.props.onChange}/>
    )
  }
})

export default StringDisplayStandard
