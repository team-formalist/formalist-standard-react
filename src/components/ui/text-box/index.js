import React from 'react'
import classNames from 'classnames'
import withoutKeys from '../../../utils/without-keys'
import styles from './text-box.mcss'

// Components
import Textarea from 'react-textarea-autosize'

/**
 * Return a set of rows as per http://andreypopp.github.io/react-textarea-autosize/
 * based on the boxSize
 * @param  {String} size
 * @return {Object} An object describing the various row properties per-size.
 */
function boxSize (size) {
  let rows = {
    single: {
      rows: 1,
      maxRows: 1,
    },
    small: {
      minRows: 3,
      maxRows: 6,
    },
    normal: {
      minRows: 5,
      maxRows: 10,
    },
    large: {
      minRows: 8,
      maxRows: 16,
    },
    xlarge: {
      minRows: 12,
    },
  }
  return (size) ? rows[size] : rows['normal']
}

/**
 * TextBox
 */
const TextBox = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    error: React.PropTypes.bool,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    textSize: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    boxSize: React.PropTypes.oneOf(['single', 'small', 'normal', 'large', 'xlarge']),
  },

  getDefaultProps () {
    return {
      error: false,
      textSize: 'normal',
      boxSize: 'normal',
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

  render () {
    let textBoxClassNames = classNames(
      this.props.className,
      styles.textBox,
      {
        [`${styles.error}`]: this.props.error,
        [`${styles.focus}`]: this.state.focus,
      },
      `${styles[this.props.textSize]}`
    )

    const propsToPass = withoutKeys(this.props, ['error', 'textSize', 'boxSize', 'className', 'onBlur', 'onFocus'])

    return (
      <Textarea
        {...propsToPass}
        {...boxSize(this.props.boxSize)}
        className={textBoxClassNames}
        onBlur={this.onBlur}
        onFocus={this.onFocus} />
    )
  },
})

export default TextBox
