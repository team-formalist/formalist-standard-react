import React from 'react'
import Label from '../../../ui/label'
import styles from './header.css'

/**
 * A common header component for every field. Renders the label and an optional
 * hint.
 */
const FieldHeader = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    hint: React.PropTypes.string
  },

  render () {
    let { label, hint } = this.props
    if (!label && !hint) {
      return null
    }
    return (
      <div className={styles.base}>
        {(label) ? <Label className={styles.label}>{label}</Label> : null}
        {(hint) ? <span className={styles.hint}>{hint}</span> : null}
      </div>
    )
  }
})

export default FieldHeader
