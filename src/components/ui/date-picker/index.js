import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import "moment/locale/en-au"

// Components
import DayPicker, { DateUtils, LocaleUtils } from 'react-day-picker'
import Portal from 'react-portal'
import Input from '../input'

// Styles
import styles from './date-picker.mcss'

// Set up simple localeUtils that always sets first day of week to Monday
// FIXME Doesn't seem to work even though it's correct AFAICT
const localeUtils = Object.assign({}, LocaleUtils, {getFirstDayOfWeek: (locale) => 1})

const daypickerOffset = {
  left: 0,
  top: 0
}

const DatePicker = React.createClass({
  getInitialState () {
    return {
      value: (this.props.defaultValue) ?  moment(this.props.defaultValue, 'YYYY-MM-DD').format('l') : '',
      month: this.props.month || new Date(),
      daypickerPosition: {
        left: 0,
        top: 0
      }
    }
  },

  getDefaultProps () {
    return {
      placeholder: 'Select a date'
    }
  },

  componentWillMount () {
    window.addEventListener('resize', this.onResize)
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  },

  componentDidMount () {
    this.calculateDaypickerPosition()
  },

  onInputChange (e) {
    let inputValue = e.target.value
    // Change the current month only if the value entered by the user is a valid
    // date, according to the `L` format
    if (moment(inputValue, 'l', true).isValid()) {
      this.setState({
        month: moment(inputValue, 'l').toDate(),
        value: inputValue
      }, this.showCurrentDate);
      // Pass the value back
      let storedValue = moment(inputValue, 'l').format('YYYY-MM-DD')
      this.props.onChange(storedValue)
    } else {
      this.setState({
        value: inputValue
      }, this.showCurrentDate);
    }
  },

  showCurrentDate () {
    this.refs.daypicker.showMonth(this.state.month)
  },

  onInputFocus (e) {
    this.refs.daypickerPortal.openPortal()
    this.calculateDaypickerPosition()
  },

  onDayClick (e, day) {
    let value = moment(day).format('l')
    this.setState({
      value: value,
      month: day
    })
    // Pass the value back
    let storedValue = moment(value, 'l').format('YYYY-MM-DD')
    this.props.onChange(storedValue)
  },

  onResize (e) {
    this.calculateDaypickerPosition()
  },

  calculateDaypickerPosition () {
    // Only bother if its rendered
    let inputEl = ReactDOM.findDOMNode(this.refs.dateInput)
    let inputPosition = inputEl.getBoundingClientRect()
    this.setState({
      daypickerPosition: {
        left: inputPosition.left + daypickerOffset.left,
        top: inputPosition.top + inputPosition.height + daypickerOffset.top
      }
    })
  },

  render () {
    let { id, className, error, placeholder } = this.props
    let { value } = this.state
    let selectedDay = moment(this.state.value, 'l', true).toDate()

    return (
      <div className={className}>
        <Input
          ref='dateInput'
          id={id}
          error={error}
          placeholder={placeholder}
          value={value}
          onChange={this.onInputChange}
          onFocus={this.onInputFocus} />
        <Portal ref='daypickerPortal' closeOnEsc closeOnOutsideClick>
          <div ref='daypickerContainer' className={styles.daypickerContainer} style={this.state.daypickerPosition}>
            <DayPicker
              ref='daypicker'
              locale='en-AU'
              localeUtils={localeUtils}
              initialMonth={this.state.month}
              modifiers={{
                selected: (day) => DateUtils.isSameDay(selectedDay, day)
              }}
              onDayClick={ this.onDayClick } />
          </div>
        </Portal>
      </div>
    )
  }
})

export default DatePicker
