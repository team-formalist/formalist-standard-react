import React from 'react'
import PropTypes from 'prop-types'
import uid from 'uid'
import classNames from 'classnames'
import styles from './checkbox.mcss'

/**
 * Checkbox
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
class Checkbox extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    value: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    error: false,
    size: 'normal',
  };

  state = {
    id: uid(10),
    focus: false,
  };

  onBlur = (e) => {
    this.setState({focus: false})
  };

  onFocus = (e) => {
    this.setState({focus: true})
  };

  onChange = (e) => {
    this.props.onChange(e, e.target.checked)
  };

  render () {
    let {defaultChecked, label, name, value} = this.props
    let labelClassNames = classNames(
      styles.label,
      {
        [`${styles.error}`]: this.props.error,
        [`${styles.focus}`]: this.state.focus,
      }
    )

    return (
      <div className={styles.button}>
        <input
          className={styles.input}
          id={this.state.id}
          type='checkbox'
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange}
        />
        <label
          className={labelClassNames}
          htmlFor={this.state.id}
        >
          {label}
        </label>
      </div>
    )
  }
}

export default Checkbox
