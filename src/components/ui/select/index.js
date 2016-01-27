import React from 'react'
import uid from 'uid'
import classNames from 'classnames'
import styles from './select.mcss'

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
    let labelClassNames = classNames(
      styles.label,
      {
        [`${styles.labelError}`]: this.props.error,
        [`${styles.labelFocus}`]: this.state.focus
      }
    )
    let inputClassNames = classNames(
      this.props.className,
      styles.select,
      {
        [`${styles.error}`]: this.props.error,
        [`${styles.focus}`]: this.state.focus
      },
      `${styles[this.props.size]}`
    )

    // Generate a placeholder with a fake value seed to trick our <select>
    // into appearing to show it correctly
    let valueSeed = uid(10)
    let placeholder = <option value={valueSeed} hidden={true} disabled={true}>Select an option</option>
    let defaultValue = this.props.defaultValue || valueSeed

    return (
      <label className={labelClassNames}>
        <select
          {...this.props}
          defaultValue={defaultValue}
          className={inputClassNames}
          onBlur={() => this.setState({focus: false})}
          onFocus={() => this.setState({focus: true})}>
          {placeholder}
          {this.props.children}
        </select>
      </label>
    )
  }
})

export default Input
