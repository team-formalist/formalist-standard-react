import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/en-au";

// Components
import DatePicker from "../date-picker";
import TimePicker from "../time-picker";

// Styles
import * as styles from "./styles";

export const dateFormats = {
  utc: "YYYY-MM-DDTHH:mm:ssZ",
  date: "YYYY-MM-DD",
  time: "HH:mm:ss"
};

class DateTimePicker extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    error: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    timeFormat: PropTypes.string,
    humanTimeFormat: PropTypes.string
  };

  constructor(props) {
    super(props);
    if (props.value) {
      let parsedDateTime = moment(props.value, dateFormats.utc);
      if (parsedDateTime.isValid()) {
        this.dateTime = parsedDateTime;

        this.state = {
          date: parsedDateTime.format(dateFormats.date),
          time: parsedDateTime.format(dateFormats.time)
        };

        return;
      }
    }

    this.state = {
      date: null,
      time: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      let parsedDateTime = moment(nextProps.value, dateFormats.utc);
      if (parsedDateTime.isValid()) {
        this.dateTime = parsedDateTime;
        this.setState({
          date: parsedDateTime.format(dateFormats.date),
          time: parsedDateTime.format(dateFormats.time)
        });
      }
    }
  }

  onDateChange = date => {
    let parsedDate = moment(date, dateFormats.date);
    if (parsedDate.isValid()) {
      if (this.dateTime) {
        this.dateTime = this.dateTime.set({
          year: parsedDate.year(),
          month: parsedDate.month(),
          date: parsedDate.date()
        });
      } else {
        this.dateTime = parsedDate;
      }
      this.setState(
        {
          date: this.dateTime.format(dateFormats.date)
        },
        this.onChange
      );
    } else {
      // Handle invalid or blank values
      this.setState(
        {
          date: null
        },
        this.onChange
      );
    }
  };

  /**
   * Set the passed `time` into the date time
   * @param  {String} time Time to apply to the current date-time
   */
  onTimeChange = time => {
    let parsedTime = moment(time, dateFormats.time);
    if (parsedTime.isValid()) {
      if (this.dateTime) {
        this.dateTime = this.dateTime.set({
          hours: parsedTime.hours(),
          minutes: parsedTime.minutes(),
          seconds: parsedTime.seconds()
        });
      } else {
        this.dateTime = parsedTime;
      }
      this.setState(
        {
          time: this.dateTime.format(dateFormats.time)
        },
        this.onChange
      );
    } else {
      // Handle invalid or blank values
      this.setState(
        {
          time: null
        },
        this.onChange
      );
    }
  };

  onChange = () => {
    const { date, time } = this.state;
    if (date && time) {
      this.props.onChange(this.dateTime.format(dateFormats.utc));
    } else {
      this.props.onChange(null);
    }
  };

  render() {
    let { error, id, placeholder, timeFormat, humanTimeFormat } = this.props;

    let dateValue = this.state.date;
    let timeValue = this.state.time;

    return (
      <div className={styles.base}>
        <div className={styles.datePicker}>
          <DatePicker
            id={id}
            error={error}
            placeholder={placeholder}
            value={dateValue}
            onChange={this.onDateChange}
          />
        </div>
        <div className={styles.timePicker}>
          <TimePicker
            error={error}
            value={timeValue}
            onChange={this.onTimeChange}
            timeFormat={timeFormat}
            humanTimeFormat={humanTimeFormat}
          />
        </div>
      </div>
    );
  }
}

export default DateTimePicker;
