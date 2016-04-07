import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import styles from './compound-field.mcss'

const CompoundField = ({children}) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  )
}

CompoundField.propTypes = {
  children: ImmutablePropTypes.list
}

export default CompoundField
export let CompoundFieldFactory = React.createFactory(CompoundField)
