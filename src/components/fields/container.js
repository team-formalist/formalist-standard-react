import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { actions } from 'formalist-compose'
const { addField, deleteField, editField } = actions

/**
 * Container class for fields.Consolidates common attributes and actions into a
 * single place.
 *
 */
const FieldContainer = React.createClass({

  propTypes: {
    path: ImmutablePropTypes.list.isRequired,
    store: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    config: React.PropTypes.object,
    field: React.PropTypes.func.isRequired,
    value: React.PropTypes.any.isRequired
  },

  render () {
    let { field, path, store, type } = this.props
    let Field = field

    // Abstract the actions so that each field doesn't have to worry about
    // the action implementation
    let fieldActions = {
      add: (options) => {
        return store.dispatch(
          addField(options)
        )
      },
      delete: () => {
        return store.dispatch(
          deleteField(path)
        )
      },
      edit: (val) => {
        return store.dispatch(
          editField(path, val)
        )
      }
    }

    // Extract a few config things
    let label = this.props.config.label || this.props.name.replace(/_/g, ' ')

    // Set up standard classNames based on `type`
    let fieldClassNames = classNames(
      'fm-field',
      `fm-field--${type}`,
      {'fm-field--has-errors': (this.props.errors.count() > 0)}
    )

    return (
      // *Explicitly* pass all the props we care about down to the field
      // rather than dumping everything through
      <div className={fieldClassNames}>
        <Field
          actions={ fieldActions }
          name={this.props.name}
          value={this.props.value}
          config={this.props.config}
          errors={this.props.errors}
          label={label}
          hint={this.props.config.hint}
          displayVariants={this.props.displayVariants}/>
      </div>
    )
  }
})

export default FieldContainer
