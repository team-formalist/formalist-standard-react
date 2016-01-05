import React from 'react'

const Group = ({name, children}) => {
  return (
    <div className='group'>
      {children.map((child, index) => <div key={index} className='group__item'>{child}</div>)}
    </div>
  )
}

export default Group
export let GroupFactory = React.createFactory(Group)
