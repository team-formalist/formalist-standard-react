import React from 'react'
import PropTypes from 'prop-types'
import uid from 'uid'
import classNames from 'classnames'
import * as styles from './styles'

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
class RadioButton extends React.Component {
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
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]),
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

  render () {
    let { defaultChecked, label, name, onChange, value } = this.props
    let labelClassNames = classNames(
      styles.label,
      {
        [`${styles.error}`]: this.props.error,
        [`${styles.focus}`]: this.state.focus,
      }
    )

    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return (
      <div className={styles.button}>
        <button
          onClick={(e) => {
            e.preventDefault()
            if (this._input) {
              e.stopPropagation()
              this.props.onChange({target: {value: this.props.value}})
            }
          }}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        >
          <input
            ref={(c) => { this._input = c }}
            className={styles.input}
            id={this.state.id}
            type='radio'
            name={name}
            value={value}
            checked={defaultChecked}
            disabled={this.state.focus}
            onChange={onChange}
          />
          <label
            className={labelClassNames}
            htmlFor={this.state.id}
          >
            {label}
          </label>
        </button>
      </div>
    )
    /* eslint-enable react/jsx-no-bind */
  }
}

export default RadioButton
