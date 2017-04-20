import React from 'react'
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
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    defaultChecked: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    size: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    value: React.PropTypes.bool,
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
