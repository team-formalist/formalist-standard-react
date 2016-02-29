import React from 'react'
import classNames from 'classnames'
import styles from './input.mcss'

/**
 * Input
 *
 * States:
 * - focus
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
    error: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    size: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge'])
  },

  getDefaultProps () {
    return {
      error: false,
      size: 'normal',
      type: 'text'
    }
  },

  getInitialState () {
    return {
      focus: false
    }
  },

  onFocus (e) {
    this.setState({focus: true})
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  },

  onBlur (e) {
    this.setState({focus: false})
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  },

  render () {
    let inputClassNames = classNames(
      this.props.className,
      styles.input,
      {
        [`${styles.error}`]: this.props.error,
        [`${styles.focus}`]: this.state.focus
      },
      `${styles[this.props.size]}`
    )
    return (
      <input
        {...this.props}
        className={inputClassNames}
        onBlur={this.onBlur}
        onFocus={this.onFocus}/>
    )
  }
})

export default Input
