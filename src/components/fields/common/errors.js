import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const FieldErrors = React.createClass({
  propTypes: {
    errors: ImmutablePropTypes.list.isRequired
  },

  render() {
    let { errors } = this.props
    return (
      <div className="fm-field-errors">
        {errors.map((error) => {
          return (
            <li key={error.error_name}>{error.error_message}</li>
          )
        })}
      </div>
    )
  }
 })

export default FieldErrors
