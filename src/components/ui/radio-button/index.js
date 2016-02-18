import React from 'react'
import uid from 'uid'
import classNames from 'classnames'
import styles from './radio-button.mcss'

/**
 * RadioButton
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
const RadioButton = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge'])
  },

  getDefaultProps () {
    return {
      disabled: false,
      error: false,
      size: 'normal'
    }
  },

  getInitialState () {
    return {
      id: uid(10),
      focus: false
    }
  },

  render () {
    let { defaultChecked, label, name, onChange, value } = this.props
    let labelClassNames = classNames(
      styles.label,
      {
        [`${styles.error}`]: this.props.error,
        [`${styles.focus}`]: this.state.focus
      }
    )

    return (
      <div className={styles.button}>
        <input
          className={styles.input}
          id={this.state.id}
          type='radio'
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          onBlur={() => this.setState({focus: false})}
          onFocus={() => this.setState({focus: true})}
          onChange={onChange}/>
        <label
          className={labelClassNames}
          htmlFor={this.state.id}>
            {label}
        </label>
      </div>
    )
  }
})

export default RadioButton
