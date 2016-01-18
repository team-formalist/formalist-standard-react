import React from 'react'
import classNames from 'classnames'

/**
 * TextBox
 */
const TextBox = React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },
  render () {
    let textBoxClassNames = classNames(
      this.props.className,
      'ui-textbox'
    )
    return (
      <textarea {...this.props} className={textBoxClassNames}/>
    )
  }
})

export default TextBox
