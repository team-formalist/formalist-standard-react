import React from 'react'
import PropTypes from 'prop-types'
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
class Select extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    error: PropTypes.bool,
    defaultValue: PropTypes.string,
    id: PropTypes.string,
    clearable: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
  };

  static defaultProps = {
    clearable: true,
    error: false,
    placeholder: 'Select an option',
    size: 'normal',
  };

  state = {
    focus: false,
  };

  onFocus = (e) => {
    this.setState({focus: true})
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  };

  onBlur = (e) => {
    this.setState({focus: false})
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  };

  onChange = (e) => {
    this.props.onChange(e, e.target.value)
  };

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
  }
}

export default Select
