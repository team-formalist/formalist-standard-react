import React, {Component} from 'react'
import classNames from 'classnames'
import styles from './spinner.mcss'

class Spinner extends Component {
  render () {
    const spinnerClassNames = classNames(styles.spinner, this.props.className)
    return (
      <div className={spinnerClassNames}></div>
    )
  }
}

Spinner.propTypes = {
  className: React.PropTypes.string,
}

export default Spinner
