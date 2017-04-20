import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './spinner.mcss'

class Spinner extends Component {
  render () {
    const spinnerClassNames = classNames(styles.spinner, this.props.className)
    return (
      <div className={spinnerClassNames} />
    )
  }
}

Spinner.propTypes = {
  className: PropTypes.string,
}

export default Spinner
