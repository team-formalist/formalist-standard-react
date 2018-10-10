import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import uid from "uid";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import RadioButton from "../../ui/radio-button";

// Import styles
import * as styles from "./styles";

/**
 * Radio Buttons field
 */
class RadioButtons extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    name: PropTypes.string,
    namePath: PropTypes.string,
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

  constructor(props) {
    super(props);
    const { name } = props;

    this.state = {
      groupId: `${name}__${uid(10)}`
    };
  }

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange = e => {
    let value = e.target.value;
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

    // Extract options
    let options = attributes.options;
    // Return nothing if we have no values
    if (options && options.length === 0) {
      return false;
    }

    return (
      <div
        className={fieldClassNames}
        data-field-name={name}
        data-field-type="radio-buttons"
      >
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={styles.display}>
          {options.map((option, i) => {
            let optionValue, optionLabel;
            if (Array.isArray(option)) {
              optionValue = option[0];
              optionLabel = option[1] || optionValue;
            } else {
              optionValue = option;
              optionLabel = option;
            }
            let checked = value != null && optionValue === value;
            return (
              <RadioButton
                key={i}
                name={this.state.groupId}
                label={optionLabel}
                error={hasErrors}
                value={optionValue}
                checked={checked}
                onChange={this.onChange}
              />
            );
          })}
          {hasErrors ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    );
  }
}

export default RadioButtons;
