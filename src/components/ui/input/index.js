import React from 'react'
import classNames from 'classnames'
import './index.css'

/**
 * Input
 *
 * States:
 * - reversed
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
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.bool,
    reversed: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['small', 'normal', 'large'])
  },

  getDefaultProps () {
    return {
      disabled: false,
      error: false,
      reversed: false,
      size: 'normal',
      type: 'text'
    }
  },

  getInitialState () {
    return {
      focus: false
    }
  },

  render () {
    let textBoxClassNames = classNames(
      this.props.className,
      'ui-input',
      {
        'ui-input--disabled': this.props.disabled,
        'ui-input--error': this.props.error,
        'ui-input--focus': this.state.focus,
        'ui-input--reversed': this.props.reversed
      },
      `ui-input--size-${this.props.size}`
    )
    return (
      <input
        {...this.props}
        className={textBoxClassNames}
        onBlur={() => this.setState({focus: false})}
        onFocus={() => this.setState({focus: true})}/>
    )
  }
})

export default Input
