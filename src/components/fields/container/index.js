import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import * as styles from "./styles";
import { events } from "formalist-compose";

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
    namePath: PropTypes.string.isRequired,
    rules: ImmutablePropTypes.list,
    type: PropTypes.string.isRequired,
    value: PropTypes.any
  };

  /**
   * Create `context` object for each field to access
   */

  static childContextTypes = {
    globalConfig: PropTypes.object
  };

  getChildContext() {
    return {
      globalConfig: this.props.globalConfig
    };
  }

  shouldComponentUpdate(nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // field. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return this.props.hashCode !== nextProps.hashCode;
  }

  render() {
    let {
      attributes,
      bus,
      config,
      edit,
      errors,
      field,
      name,
      namePath,
      remove,
      rules,
      value
    } = this.props;
    let Field = field;

    // Turn the attributes from an Immutable.Map into a POJO
    attributes = attributes.toJS();

    // Extract a few things from attributes
    let label = attributes.label || this.props.name.replace(/_/g, " ");
    let { hint } = attributes;

    // Set up standard classNames
    let containerClassNames = classNames(styles.base, {
      [`${styles.errors}`]: errors.count() > 0
    });

    return (
      // *Explicitly* pass all the props we care about down to the field
      // rather than dumping everything through
      <div className={containerClassNames} data-field-container={namePath}>
        <Field
          actions={{ edit, remove }}
          bus={bus}
          config={config}
          name={name}
          value={value}
          rules={rules}
          errors={errors}
          attributes={attributes}
          label={label}
          hint={hint}
        />
      </div>
    );
  }
}

export default FieldContainer;
