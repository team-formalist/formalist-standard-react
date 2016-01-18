import React from 'react'
import styles from './section.css'

const Section = ({name, children}) => {
  return (
    <section className={styles.base}>
      <h2 className={styles.name}>{name.replace(/_/, ' ')}</h2>
      <div className={styles.children}>
        {children}
      </div>
    </section>
  )
}

export default Section
export let SectionFactory = React.createFactory(Section)
