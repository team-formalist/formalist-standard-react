import React from 'react'
import classNames from 'classnames'

import styles from './label.mcss'

const Label = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
  },
  render () {
    let labelBoxClassNames = classNames(
      this.props.className,
      styles.base
    )
    return (
      <label {...this.props} className={labelBoxClassNames} />
    )
  },
})

export default Label
