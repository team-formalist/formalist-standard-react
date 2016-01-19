import React from 'react'
import Label from '../../../ui/label'
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
    return (
      <div className={styles.base}>
        {(label) ? <Label htmlFor={id} className={styles.label}>{label}</Label> : null}
        {(hint) ? <span className={styles.hint}>{hint}</span> : null}
      </div>
    )
  }
})

export default FieldHeader
