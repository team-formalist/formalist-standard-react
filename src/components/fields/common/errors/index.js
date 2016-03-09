import React from 'react'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styles from './errors.mcss'

/**
 * A common component for rendering errors for a field.
 */
const FieldErrors = React.createClass({

  propTypes: {
    errors: ImmutablePropTypes.list.isRequired
  },

  shouldComponentUpdate (nextProps) {
    return !Immutable.is(this.props.errors, nextProps.errors)
  },

  render () {
    let { errors } = this.props
    if (errors.count() === 0) {
      return null
    }
    return (
      <div className={ styles.base }>
        <ul className={ styles.list }>
          { errors.map((error, i) => {
            return (
              <li className={ styles.item } key={ i }>{ error }</li>
            )
          }) }
        </ul>
      </div>
    )
  }
})

export default FieldErrors
