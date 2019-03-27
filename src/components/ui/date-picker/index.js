import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/en-au";

// Components
import DayPicker, { DateUtils, LocaleUtils } from "react-day-picker";
import Input from "../input";
import Popunder from "../popunder";

// Styles
import * as styles from "./styles";

// Set up simple localeUtils that always sets first day of week to Monday
const localeUtils = Object.assign({}, LocaleUtils, {
  getFirstDayOfWeek: locale => 1
});

/**
 * Expand date from YYYY-MM-DD to l
 */
function expandDate(dateString) {
  return moment(dateString, "YYYY-MM-DD").format("l");
}

/**
 * Compress date from l to YYYY-MM-DD
 */
function compressDate(dateString) {
  return moment(dateString, "l").format("YYYY-MM-DD");
}

class DatePicker extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.bool,
    id: PropTypes.string,
    month: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    placeholder: "Select a date"
  };

  state = {
    value: this.props.value ? expandDate(this.props.value) : "",
    month: this.props.month || new Date()
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setState({
        value: expandDate(nextProps.value)
      });
    }
  }

  onInputChange = (e, value) => {
    // Change the current month only if the value entered by the user is a valid
    // date, according to the `L` format
    if (moment(value, "l", true).isValid()) {
      this.setState(
        {
          month: moment(value, "l").toDate(),
          value
        },
        this.showCurrentDate
      );
      // Pass the value back
      let storedValue = compressDate(value);
      this.props.onChange(storedValue);
    } else {
      // Pass the value back if it’s empty
      if (value === "") {
        this.props.onChange(value);
      }
      this.setState(
        {
          value
        },
        this.showCurrentDate
      );
    }
  };

  showCurrentDate = () => {
    if (this._daypicker) {
      this._daypicker.showMonth(this.state.month);
    }
  };

  onInputFocus = e => {
    this._popunder.openPopunder();
  };

  onDayClick = day => {
    let value = moment(day).format("l");
    this.setState({
      value: value,
      month: day
    });
    // Pass the value back
    let storedValue = compressDate(value);
    this.props.onChange(storedValue);
  };

  render() {
    let { id, className, error, placeholder } = this.props;
    let { month, value } = this.state;
    let selectedDay = moment(this.state.value, "l", true).toDate();

    return (
      <div className={className}>
        <Popunder
          ref={c => {
            this._popunder = c;
          }}
          closeOnEsc
          closeOnOutsideClick
        >
          <Input
            id={id}
            error={error}
            placeholder={placeholder}
            value={value}
            onChange={this.onInputChange}
            onFocus={this.onInputFocus}
            data-field-input="date"
          />
          <DayPicker
            ref={c => {
              this._daypicker = c;
            }}
            classNames={styles}
            locale="en-AU"
            localeUtils={localeUtils}
            initialMonth={month}
            modifiers={{
              [`${styles.selected}`]: day => DateUtils.isSameDay(selectedDay, day)
            }}
            onDayClick={this.onDayClick}
          />
        </Popunder>
      </div>
    );
  }
}

export default DatePicker;
