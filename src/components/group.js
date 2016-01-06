import React from 'react'

const Group = ({name, children}) => {
  return (
    <div className='fm-group'>
      {children.map((child, index) => <div key={index} className='fm-group__item'>{child}</div>)}
    </div>
  )
}

export default Group
export let GroupFactory = React.createFactory(Group)
