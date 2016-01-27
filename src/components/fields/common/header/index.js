import React from 'react'
import Label from '../../../ui/label'
import classNames from 'classnames'
import styles from './header.mcss'

/**
 * A common header component for every field. Renders the label and an optional
 * hint.
 */
const FieldHeader = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    hint: React.PropTypes.string
  },

  render () {
    let { id, label, hint } = this.props
    if (!label && !hint) {
      return null
    }
    let labelClassNames = classNames(styles.base,
      styles.label,
      {
        [`${styles.error}`]: this.props.error,
      }
    )
    let hintClassNames = classNames(styles.base,
      styles.hint,
      {
        [`${styles.error}`]: this.props.error,
      }
    )
    return (
      <div className={styles.base}>
        {(label) ? <Label htmlFor={id} className={labelClassNames}>{label}</Label> : null}
        {(hint) ? <span className={hintClassNames}>{hint}</span> : null}
      </div>
    )
  }
})

export default FieldHeader
