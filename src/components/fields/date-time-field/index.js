import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import moment from "moment";

// Import the display types
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import DateTimePicker, { dateFormats } from "../../ui/date-time-picker";

// Import styles
import * as styles from "./styles";

/**
 * Date Time field
 */
class DateTimeField extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    attributes: PropTypes.shape({
      label: PropTypes.string,
      hint: PropTypes.string,
      placeholder: PropTypes.string,
      inline: PropTypes.bool
    }),
    errors: ImmutablePropTypes.list,
    hint: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    config: PropTypes.object,
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
   * @param  {String} date Date as a dd/mm/yyyy formatted string
   */
  onChange = date => {
    this.props.actions.edit(val => {
      return date;
    });
  };

  /**
   * setToNow
   */
  setToNow = () => {
    this.onChange(moment().format(dateFormats.utc));
  };

  render() {
    let { attributes, errors, hint, label, name, value } = this.props;
    let hasErrors = errors.count() > 0;

    // Set up field classes
    let fieldClassNames = classNames(styles.base, {
      [`${styles.baseInline}`]: attributes.inline
    });
    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return (
      <div className={fieldClassNames}>
        <button
          className={styles.nowButton}
          onClick={e => {
            e.preventDefault();
            this.setToNow();
          }}
        >
          Set to now
        </button>
        <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        <div className={styles.display}>
          <DateTimePicker
            id={name}
            error={hasErrors}
            placeholder={attributes.placeholder}
            value={value}
            onChange={this.onChange}
          />
        </div>
        {hasErrors ? <FieldErrors errors={errors} /> : null}
      </div>
    );
    /* eslint-enable react/jsx-no-bind */
  }
}

export default DateTimeField;
