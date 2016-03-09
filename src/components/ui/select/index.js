import React from 'react'
import uid from 'uid'
import classNames from 'classnames'
import styles from './select.mcss'

/**
 * Select
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
const Select = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    error: React.PropTypes.bool,
    defaultValue: React.PropTypes.string,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    size: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    valueSeed: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      error: false,
      placeholder: 'Select an option',
      size: 'normal',
      valueSeed: uid(10)
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

  /**
   * generatePlaceholder
   * Generate a placeholder with a fake value seed to trick our <select>
   */

  generatePlaceholder (valueSeed, placeholder) {
    return (
      <option value={ valueSeed } hidden={ true } disabled={ true }>{ placeholder }</option>
    )
  },

  render () {
    let { error, className, valueSeed, placeholder, defaultValue, children } = this.props
    let { focus } = this.state
    let value = defaultValue || valueSeed

    let labelClassNames = classNames(
      styles.label,
      {
        [`${styles.labelError}`]: error,
        [`${styles.labelFocus}`]: focus
      }
    )
    let inputClassNames = classNames(
      className,
      styles.select,
      {
        [`${styles.error}`]: error,
        [`${styles.focus}`]: focus
      },
      `${styles[this.props.size]}`
    )

    return (
      <label className={ labelClassNames }>
        <select
          { ...this.props }
          defaultValue={ value }
          className={ inputClassNames }
          onBlur={ this.onBlur }
          onFocus={ this.onFocus }>
          { this.generatePlaceholder(valueSeed, placeholder) }
          { children }
        </select>
      </label>
    )
  }
})

export default Select
