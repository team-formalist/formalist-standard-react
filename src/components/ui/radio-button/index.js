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
    defaultChecked: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    size: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    value: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number,
      React.PropTypes.string
    ])
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

  onBlur (e) {
    this.setState({focus: false})
  },

  onFocus (e) {
    this.setState({focus: true})
  },

  render () {
    let { defaultChecked, label, name, onChange, value } = this.props
    let labelClassNames = classNames(
      styles.label,
      {
        [`${styles.error}`]: this.props.error,
        [`${styles.focus}`]: this.state.focus,
      }
    )

    return (
      <div className={styles.button}>
        <button onClick={(e) => {
            e.preventDefault()
            if (this._input) {
              e.stopPropagation()
              this.props.onChange({target: { value: this.props.value}})
            }
          }}
          onBlur={this.onBlur}
          onFocus={this.onFocus}>
          <input
            ref={(c) => this._input = c}
            className={styles.input}
            id={this.state.id}
            type='radio'
            name={name}
            value={value}
            checked={defaultChecked}
            disabled={this.state.focus}
            onChange={onChange} />
          <label
            className={labelClassNames}
            htmlFor={this.state.id}>
              {label}
          </label>
        </button>
      </div>
    )
  }
})

export default RadioButton
