import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import "moment/locale/en-au"

// Components
import DatePicker from '../date-picker'
import TimePicker from '../time-picker'

// Styles
import styles from './date-time-picker.mcss'

const dateFormats = {
  utc: 'YYYY-MM-DDTHH:mm:ssZ',
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss'
}

const DateTimePicker = React.createClass({

  getInitialState () {
    if (this.props.defaultValue) {
      let parsedDateTime = moment(this.props.defaultValue, dateFormats.utc)
      if (parsedDateTime.isValid()) {
        this.dateTime = parsedDateTime
        return {
          date: parsedDateTime.format(dateFormats.date),
          time: parsedDateTime.format(dateFormats.time)
        }
      }
    }
    return {
      date: null,
      time: null
    }
  },

  onDateChange (date) {
    let parsedDate = moment(date, dateFormats.date)
    if (parsedDate.isValid()) {
      if (this.dateTime) {
        this.dateTime = this.dateTime.set({
          year: parsedDate.year(),
          month:  parsedDate.month(),
          date:  parsedDate.date()
        })
      } else {
        this.dateTime = parsedDate
      }
    }
    this.onChange()
  },

  /**
   * Set the passed `time` into the date time
   * @param  {String} time Time to apply to the current date-time
   */
  onTimeChange (time) {
    let parsedTime = moment(time, dateFormats.time)
    if (parsedTime.isValid()) {
      if (this.dateTime) {
        this.dateTime = this.dateTime.set({
          hours: parsedTime.hours(),
          minutes:  parsedTime.minutes(),
          seconds:  parsedTime.seconds()
        })
      } else {
        this.dateTime = parsedTime
      }
    }
    this.onChange()
  },

  onChange () {
    this.props.onChange(this.dateTime.format(dateFormats.utc))
  },

  render () {
    let { className, error, id, placeholder, value } = this.props

    let dateValue = this.state.date
    let timeValue = this.state.time

    return (
      <div className={styles.base}>
        <div className={styles.datePicker}>
          <DatePicker
            id={id}
            error={error}
            placeholder={placeholder}
            defaultValue={dateValue}
            onChange={this.onDateChange} />
        </div>
        <div className={styles.timePicker}>
          <TimePicker
            defaultValue={timeValue}
            onChange={this.onTimeChange}/>
        </div>
      </div>
    )
  }
})

export default DateTimePicker
