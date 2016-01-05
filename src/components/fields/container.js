import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
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
    name: React.PropTypes.string.isRequired,
    config: React.PropTypes.object,
    field: React.PropTypes.func.isRequired,
    value: React.PropTypes.any.isRequired
  },

  render () {
    let { field, path, store } = this.props
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

    return (
      // *Explicitly* pass all the props we care about down to the field
      // rather than dumping everything through
      <Field
        actions={ fieldActions }
        name={this.props.name}
        value={this.props.value}
        config={this.props.config} />
    )
  }
})

export default FieldContainer
