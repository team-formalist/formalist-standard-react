import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import TextBox from "../../ui/text-box";

// Import styles
import * as styles from "./styles";

/**
 * Text Area field
 */
class TextArea extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    name: PropTypes.string,
    config: PropTypes.object,
    attributes: PropTypes.shape({
      label: PropTypes.string,
      hint: PropTypes.string,
      placeholder: PropTypes.string,
      inline: PropTypes.bool,
      code: PropTypes.bool,
      box_size: PropTypes.oneOf([
        "single",
        "small",
        "normal",
        "large",
        "xlarge"
      ]),
      text_size: PropTypes.oneOf([
        "xsmall",
        "small",
        "normal",
        "large",
        "xlarge"
      ])
    }),
    hint: PropTypes.string,
    label: PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: PropTypes.string
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

    // Set up input classes
    let inputClassNames = classNames({
      [`${styles.code}`]: attributes.code
    });

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={styles.display}>
          <TextBox
            id={name}
            error={hasErrors}
            className={inputClassNames}
            placeholder={attributes.placeholder}
            defaultValue={value}
            onChange={this.onChange}
            boxSize={attributes.box_size}
            textSize={attributes.text_size}
          />
          {hasErrors ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    );
  }
}

export default TextArea;
