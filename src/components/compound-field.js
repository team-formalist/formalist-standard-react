import React from 'react'

import styles from './compound-field.mcss'

const CompoundField = ({errors, children}) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  )
}

export default CompoundField
export let CompoundFieldFactory = React.createFactory(CompoundField)
