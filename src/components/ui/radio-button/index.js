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
    let { defaultChecked, label, name, onChange, value } = this.props
    let labelClassNames = classNames(
      styles.label,
      {
        [`${styles.error}`]: this.props.error,
        [`${styles.focus}`]: this.state.focus
      }
    )

    let id = uid(10)

    return (
      <div className={styles.button}>
        <input
          className={styles.input}
          id={id}
          type='radio'
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          onBlur={() => this.setState({focus: false})}
          onFocus={() => this.setState({focus: true})}
          onChange={onChange}/>
        <label
          className={labelClassNames}
          htmlFor={id}>
            {label}
        </label>
      </div>
    )
  }
})

export default RadioButton
