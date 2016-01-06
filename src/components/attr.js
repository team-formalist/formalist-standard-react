import React from 'react'

const Attr = ({errors, children}) => {
  return (
    <div className='fm-attr'>
      {children}
    </div>
  )
}

export default Attr
export let AttrFactory = React.createFactory(Attr)
