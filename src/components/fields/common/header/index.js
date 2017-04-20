import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'shallow-equals'
import Label from '../../../ui/label'
import classNames from 'classnames'
import styles from './header.mcss'

/**
 * A common header component for every field. Renders the label and an optional
 * hint.
 */
class FieldHeader extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    hint: PropTypes.string,
    error: PropTypes.bool,
  };

  shouldComponentUpdate (nextProps) {
    return !shallow(this.props, nextProps)
  }

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
}

export default FieldHeader
