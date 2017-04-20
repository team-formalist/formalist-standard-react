import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './label.mcss'

class Label extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render () {
    let labelBoxClassNames = classNames(
      this.props.className,
      styles.base
    )
    return (
      <label {...this.props} className={labelBoxClassNames} />
    )
  }
}

export default Label
