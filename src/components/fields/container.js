import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import styles from './container.css'
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
    value: React.PropTypes.any
  },

  render () {
    let {
      config,
      displayVariant,
      displayVariants,
      errors,
      field,
      name,
      path,
      rules,
      store,
      type,
      value
    } = this.props
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
    let containerClassNames = classNames(
      styles.base,
      {
        [`${styles.errors}`]: (this.props.errors.count() > 0)
      }
    )

    return (
      // *Explicitly* pass all the props we care about down to the field
      // rather than dumping everything through
      <div className={containerClassNames}>
        <Field
          actions={ fieldActions }
          name={name}
          displayVariant={displayVariant}
          value={value}
          rules={rules}
          errors={errors}
          config={config}
          label={label}
          hint={config.hint}
          displayVariants={displayVariants}/>
      </div>
    )
  }
})

export default FieldContainer
