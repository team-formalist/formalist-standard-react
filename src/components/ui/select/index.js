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
    id: React.PropTypes.string,
    clearable: React.PropTypes.bool,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    size: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
  },

  getDefaultProps () {
    return {
      clearable: true,
      error: false,
      placeholder: 'Select an option',
      size: 'normal',
    }
  },

  getInitialState () {
    return {
      focus: false,
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

  onChange (e) {
    this.props.onChange(e, e.target.value)
  },

  render () {
    const {
      children,
      className,
      clearable,
      defaultValue,
      error,
      placeholder,
      size,
    } = this.props
    const {focus} = this.state

    let labelClassNames = classNames(
      styles.label,
      {
        [`${styles.labelError}`]: error,
        [`${styles.labelFocus}`]: focus,
      }
    )
    let inputClassNames = classNames(
      className,
      styles.select,
      {
        [`${styles.error}`]: error,
        [`${styles.focus}`]: focus,
      },
      `${styles[size]}`
    )

    // Generate a placeholder with a fake value seed to trick our <select>
    // into appearing to show it correctly
    let placeholderOption = <option
        value=''
        hidden={!clearable}
        disabled={!clearable}
      >
        {placeholder}
      </option>

    // Extract any other props
    const {id} = this.props

    return (
      <label className={labelClassNames}>
        <select
          id={id}
          defaultValue={defaultValue || ''}
          className={inputClassNames}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange}>
          {placeholderOption}
          {children}
        </select>
      </label>
    )
  },
})

export default Select
