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
    size: React.PropTypes.oneOf(['mini', 'small', 'normal', 'large', 'huge'])
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
        onBlur={() => this.setState({focus: false})}
        onFocus={() => this.setState({focus: true})}/>
    )
  }
})

export default Input
