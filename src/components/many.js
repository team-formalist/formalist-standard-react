import React from 'react'

const ManySet = React.createClass({
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

const Many = ({name, children, errors}) => {
  return (
    <div className='fm-many'>
      <h3 className='fm-many__name'>{name.replace(/_/, ' ')}</h3>
      <div className='fm-many__controls'><button>Add new {name.replace(/_/, ' ')}</button></div>
      {children.map((setChildren) => (
        <ManySet>
          {setChildren}
        </ManySet>
      ))}
    </div>
  )
}

export default Many
export let ManyFactory = React.createFactory(Many)
