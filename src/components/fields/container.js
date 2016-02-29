import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import styles from './container.mcss'
import { actions } from 'formalist-compose'
const { addField, deleteField, editField, validateField } = actions

/**
 * Container class for fields.Consolidates common attributes and actions into a
 * single place.
 *
 */
const FieldContainer = React.createClass({

  propTypes: {
    config: React.PropTypes.object,
    displayVariant: React.PropTypes.string,
    displayVariants: React.PropTypes.object,
    errors: ImmutablePropTypes.list,
    field: React.PropTypes.func.isRequired,
    hashCode: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    path: ImmutablePropTypes.list.isRequired,
    rules: ImmutablePropTypes.list,
    store: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.any
  },

  shouldComponentUpdate (nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // field. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return (this.props.hashCode !== nextProps.hashCode)
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
        return store.batchDispatch([
          editField(path, val),
          validateField(path, val)
        ])
      }
    }

    // Extract a few config things
    let label = config.label || this.props.name.replace(/_/g, ' ')

    // Set up standard classNames
    let containerClassNames = classNames(
      styles.base,
      {
        [`${styles.errors}`]: (errors.count() > 0)
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
