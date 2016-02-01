import React from 'react'

const Group = React.createClass({
  shouldComponentUpdate (nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return (this.props.key !== nextProps.key)
  },

  render () {
    return (
      <div className='fm-group'>
        {children.map((child, index) => <div key={index} className='fm-group__item'>{child}</div>)}
      </div>
    )
  }
})

export default Group
export let GroupFactory = React.createFactory(Group)
