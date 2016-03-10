import React from 'react'

import styles from './attr.mcss'

const Attr = ({errors, children}) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  )
}

export default Attr
export let AttrFactory = React.createFactory(Attr)
