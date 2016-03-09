import React from 'react'
import classNames from 'classnames'
import styles from './text-box.mcss'

// Components
import Textarea from 'react-textarea-autosize'

/**
 * Return a set of rows as per http://andreypopp.github.io/react-textarea-autosize/
 * based on the boxSize
 * @param  {String} size
 * @return {Object} An object describing the various row properties per-size.
 */
function getBoxSize (size) {
  let rows = {
    single: {
      rows: 1,
      maxRows: 1
    },
    small: {
      minRows: 3,
      maxRows: 6
    },
    normal: {
      minRows: 5,
      maxRows: 10
    },
    large: {
      minRows: 8,
      maxRows: 16
    },
    xlarge: {
      minRows: 12
    }
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
    size: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    boxSize: React.PropTypes.oneOf(['single', 'small', 'normal', 'large', 'xlarge'])
  },

  getDefaultProps () {
    return {
      error: false,
      size: 'normal',
      boxSize: 'normal'
    }
  },

  getInitialState () {
    return {
      focus: false
    }
  },

  onFocus (e) {
    let { onFocus } = this.props
    this.setState({focus: true})
    if (onFocus) {
      onFocus(e)
    }
  },

  onBlur (e) {
    let { onBlur } = this.props
    this.setState({focus: false})
    if (onBlur) {
      onBlur(e)
    }
  },

  render () {
    let { className, error, size, boxSize } = this.props
    let { focus } = this.state

    let textBoxClassNames = classNames(
      className,
      styles.textBox,
      {
        [`${styles.error}`]: error,
        [`${styles.focus}`]: focus
      },
      `${styles[size]}`
    )

    return (
      <Textarea {...this.props}
        {...getBoxSize(boxSize)}
        className={ textBoxClassNames }
        onBlur={ this.onBlur }
        onFocus={ this.onFocus }
      />
    )
  }
})

export default TextBox
