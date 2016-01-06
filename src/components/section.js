import React from 'react'

const Section = ({name, children}) => {
  return (
    <section className='fm-section'>
      <h2 className='fm-section__name'>{name.replace(/_/, ' ')}</h2>
      <div>
        {children}
      </div>
    </section>
  )
}

export default Section
export let SectionFactory = React.createFactory(Section)
