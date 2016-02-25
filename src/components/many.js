import React from 'react'

const ManySet = React.createClass({

  propTypes: {
    children: React.PropTypes.array
  },

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

Many.propTypes = {
  name: React.PropTypes.string,
  errors: React.PropTypes.array,
  children: React.PropTypes.array
}

export default Many
export let ManyFactory = React.createFactory(Many)
