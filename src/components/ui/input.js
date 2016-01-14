import React from 'react'
import classNames from 'classnames'

/**
 * Input
 *
 * States:
 * - focus
 * - disabled
 * - error
 *
 * Sizes:
 * - small
 * - normal*
 * - large
 *
 */
const Input = React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },
  getDefaultProps () {
    return {
      type: 'text'
    }
  },
  render () {
    let textBoxClassNames = classNames(
      this.props.className,
      'ui-input'
    )
    return (
      <input {...this.props} className={textBoxClassNames}/>
    )
  }
})

export default Input
