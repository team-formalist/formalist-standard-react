import React from 'react'
import moment from 'moment'
import 'moment/locale/en-au'

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
  propTypes: {
    defaultValue: React.PropTypes.string,
    error: React.PropTypes.bool,
    id: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string
  },

  getInitialState () {
    const { defaultValue } = this.props

    if (defaultValue) {
      let parsedDateTime = moment(defaultValue, dateFormats.utc)
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
    let dateTime = this.dateTime

    if (parsedDate.isValid()) {
      if (dateTime) {
        dateTime = dateTime.set({
          year: parsedDate.year(),
          month: parsedDate.month(),
          date: parsedDate.date()
        })
      } else {
        dateTime = parsedDate
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
    let dateTime = this.dateTime

    if (parsedTime.isValid()) {
      if (dateTime) {
        dateTime = dateTime.set({
          hours: parsedTime.hours(),
          minutes: parsedTime.minutes(),
          seconds: parsedTime.seconds()
        })
      } else {
        dateTime = parsedTime
      }
    }
    this.onChange()
  },

  onChange () {
    this.props.onChange(this.dateTime.format(dateFormats.utc))
  },

  render () {
    let { error, id, placeholder } = this.props
    let { date, time } = this.state

    return (
      <div className={ styles.base }>
        <div className={ styles.datePicker }>
          <DatePicker
            id={ id }
            error={ error }
            placeholder={ placeholder }
            defaultValue={ date }
            onChange={ this.onDateChange }
          />
        </div>
        <div className={ styles.timePicker }>
          <TimePicker
            error={ error }
            defaultValue={ time }
            onChange={ this.onTimeChange }
          />
        </div>
      </div>
    )
  }
})

export default DateTimePicker
