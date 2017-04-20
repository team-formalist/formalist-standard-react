import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import validation from 'formalist-validation'
import styles from './container.mcss'
import { actions } from 'formalist-compose'
const { deleteField, editField, validateField } = actions

/**
 * Container class for fields.
 *
 * Consolidates common attributes and actions into a single place.
 *
 */
class FieldContainer extends React.Component {
  static propTypes = {
    attributes: ImmutablePropTypes.map,
    bus: PropTypes.object.isRequired,
    config: PropTypes.object,
    errors: ImmutablePropTypes.list,
    field: PropTypes.func.isRequired,
    globalConfig: PropTypes.object,
    hashCode: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: ImmutablePropTypes.list.isRequired,
    rules: ImmutablePropTypes.list,
    store: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.any,
  };

  /**
   * Create `context` object for each field to access
   */

  static childContextTypes = {
    globalConfig: PropTypes.object,
  };

  getChildContext () {
    return {
      globalConfig: this.props.globalConfig,
    }
  }

  shouldComponentUpdate (nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // field. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return (this.props.hashCode !== nextProps.hashCode)
  }

  render () {
    let {
      attributes,
      bus,
      config,
      errors,
      field,
      name,
      path,
      rules,
      store,
      value,
    } = this.props
    let Field = field

    // Turn the attributes from an Immutable.Map into a POJO
    attributes = attributes.toJS()

    // Extract a few things from attributes
    let label = attributes.label || this.props.name.replace(/_/g, ' ')
    let { hint } = attributes

    // Curry with the form validation schema
    let validate = validation(attributes.validation)

    // Abstract the actions so that each field doesn't have to worry about
    // the action implementation
    let fieldActions = {
      delete: () => {
        return store.dispatch(
          deleteField(path)
        )
      },
      edit: (val) => {
        let editedValue = val()
        // Ensure we're not passing Immutable stuff through
        // to the validator
        if (List.isList(editedValue)) {
          editedValue = editedValue.toJS()
        }
        return store.batchDispatch([
          editField(path, val),
          validateField(path, validate(editedValue)),
        ])
      },
    }

    // Set up standard classNames
    let containerClassNames = classNames(
      styles.base,
      {
        [`${styles.errors}`]: (errors.count() > 0),
      }
    )

    return (
      // *Explicitly* pass all the props we care about down to the field
      // rather than dumping everything through
      <div className={containerClassNames}>
        <Field
          actions={fieldActions}
          bus={bus}
          config={config}
          name={name}
          value={value}
          rules={rules}
          errors={errors}
          attributes={attributes}
          label={label}
          hint={hint} />
      </div>
    )
  }
}

export default FieldContainer
