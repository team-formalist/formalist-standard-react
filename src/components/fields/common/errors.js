import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

/**
 * A common component for rendering errors for a field.
 */
const FieldErrors = React.createClass({
  propTypes: {
    errors: ImmutablePropTypes.list.isRequired
  },

  render() {
    let { errors } = this.props
    if (errors.count() === 0) {
      return null
    }
    return (
      <div className="fm-field-errors">
        <ul className="fm-field-errors__list">
          {errors.map((error, i) => {
            return (
              <li className="fm-field-errors__error" key={i}>{error}</li>
            )
          })}
        </ul>
      </div>
    )
  }
 })

export default FieldErrors
