import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const Attr = ({errors, children}) => {
  return (
    <div className='fm-attr'>
      { children }
    </div>
  )
}

Attr.propTypes = {
  children: ImmutablePropTypes.list,
  errors: ImmutablePropTypes.list
}

export default Attr
export let AttrFactory = React.createFactory(Attr)
