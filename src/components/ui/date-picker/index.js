import React from 'react'
import moment from 'moment'
import 'moment/locale/en-au'

// Components
import DayPicker, { DateUtils, LocaleUtils } from 'react-day-picker'
import Input from '../input'
import Popunder from '../popunder'

// Styles
import styles from './date-picker.mcss'

// Set up simple localeUtils that always sets first day of week to Monday
//
// FIXME This should be set to `1` so that we start weeks on a Monday, but we’re
// waiting for this PR to be merged into `react-day-picker`:
// https://github.com/gpbl/react-day-picker/pull/220
const localeUtils = Object.assign({}, LocaleUtils, {getFirstDayOfWeek: (locale) => 0})

const DatePicker = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    error: React.PropTypes.bool,
    id: React.PropTypes.string,
    month: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
  },

  getInitialState () {
    return {
      value: (this.props.defaultValue) ? moment(this.props.defaultValue, 'YYYY-MM-DD').format('l') : '',
      month: this.props.month || new Date(),
    }
  },

  getDefaultProps () {
    return {
      placeholder: 'Select a date',
    }
  },

  onInputChange (e, value) {
    // Change the current month only if the value entered by the user is a valid
    // date, according to the `L` format
    if (moment(value, 'l', true).isValid()) {
      this.setState({
        month: moment(value, 'l').toDate(),
        value,
      }, this.showCurrentDate)
      // Pass the value back
      let storedValue = moment(value, 'l').format('YYYY-MM-DD')
      this.props.onChange(storedValue)
    } else {
      this.setState({
        value,
      }, this.showCurrentDate)
    }
  },

  showCurrentDate () {
    this._daypicker.showMonth(this.state.month)
  },

  onInputFocus (e) {
    this._popunder.openPopunder()
  },

  onDayClick (e, day) {
    let value = moment(day).format('l')
    this.setState({
      value: value,
      month: day,
    })
    // Pass the value back
    let storedValue = moment(value, 'l').format('YYYY-MM-DD')
    this.props.onChange(storedValue)
  },

  render () {
    let { id, className, error, placeholder } = this.props
    let { value } = this.state
    let selectedDay = moment(this.state.value, 'l', true).toDate()

    return (
      <div className={className}>
        <Popunder
          ref={(c) => { this._popunder = c }}
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
          />
          <div className={styles.daypickerContainer}>
            <DayPicker
              ref={(c) => { this._daypicker = c }}
              locale='en-AU'
              localeUtils={localeUtils}
              initialMonth={this.state.month}
              modifiers={{
                selected: (day) => DateUtils.isSameDay(selectedDay, day),
              }}
              onDayClick={this.onDayClick}
            />
          </div>
        </Popunder>
      </div>
    )
  },
})

export default DatePicker
