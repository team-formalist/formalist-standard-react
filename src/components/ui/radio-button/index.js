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

  render () {
    let { defaultChecked, label, name, onChange, value, error } = this.props
    let { focus, id } = this.state

    let labelClassNames = classNames(
      styles.label,
      {
        [`${styles.error}`]: error,
        [`${styles.focus}`]: focus
      }
    )

    return (
      <div className={ styles.button }>
        <input
          className={ styles.input }
          id={ id }
          type='radio'
          name={ name }
          value={ value }
          defaultChecked={ defaultChecked }
          onBlur={ () => this.setState({ focus: false }) }
          onFocus={ () => this.setState({ focus: true }) }
          onChange={ onChange}/>
        <label
          className={ labelClassNames }
          htmlFor={ id }>
            { label }
        </label>
      </div>
    )
  }
})

export default RadioButton
