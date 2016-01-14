import React from 'react'
import classNames from 'classnames'

const Label = React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },
  render () {
    let textBoxClassNames = classNames(
      this.props.className,
      'ui-label'
    )
    return (
      <label {...this.props} className={textBoxClassNames}/>
    )
  }
})

export default Label
