import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import Select from "../../ui/select";

// Import styles
import * as styles from "./styles";

/**
 * Select Box field
 */
class SelectBox extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    name: PropTypes.string,
    config: PropTypes.object,
    attributes: PropTypes.shape({
      label: PropTypes.string,
      hint: PropTypes.string,
      placeholder: PropTypes.string,
      options: PropTypes.array.isRequired,
      inline: PropTypes.bool
    }),
    hint: PropTypes.string,
    label: PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  /**
   * Enable parent to pass context
   */

  static contextTypes = {
    globalConfig: PropTypes.object
  };

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange = (e, value) => {
    this.props.actions.edit(val => {
      return value;
    });
  };

  render() {
    let { attributes, errors, hint, label, name, value } = this.props;
    let hasErrors = errors.count() > 0;

    // Set up field classes
    let fieldClassNames = classNames(styles.base, {
      [`${styles.baseInline}`]: attributes.inline
    });

    // Reach into the validation attributes to determine whether the select
    // should be clearable (i.e., it’s not required)
    const clearable = !(
      attributes.validation && attributes.validation.filled === true
    );

    // Extract options
    let options = attributes.options;
    // Return nothing if we have no values
    if (options && options.length === 0) {
      return false;
    }

    // Ensure value is a string
    value = value != null && value.toString ? value.toString() : value;

    return (
      <div
        className={fieldClassNames}
        data-field-name={name}
        data-field-type="select-box"
      >
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={styles.display}>
          <Select
            data-field-input
            value={value}
            placeholder={attributes.placeholder}
            error={hasErrors}
            onChange={this.onChange}
            clearable={clearable}
          >
            {options.map((option, i) => {
              let value, label;
              if (Array.isArray(option)) {
                value = option[0];
                label = option[1] || value;
              } else {
                value = option;
                label = option;
              }
              return (
                <option key={i} value={value}>
                  {label}
                </option>
              );
            })}
          </Select>
          {hasErrors ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    );
  }
}

export default SelectBox;
