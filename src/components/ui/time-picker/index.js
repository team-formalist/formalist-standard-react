import classNames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import 'moment/locale/en-au'

// Components
import Popunder from '../popunder'
import Input from '../input'

// Styles
import styles from './time-picker.mcss'

const dateFormats = {
  time: 'HH:mm:ss',
  humanTime: 'hh:mma'
}

const TimePicker = React.createClass({

  propTypes: {
    defaultValue: React.PropTypes.string,
    error: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string
  },

  getInitialState () {
    let inputValue
    let parsedTime = moment(this.props.defaultValue, dateFormats.time)
    if (parsedTime.isValid()) {
      this.time = parsedTime
      inputValue = parsedTime.format(dateFormats.humanTime)
    }
    return {
      inputValue: inputValue
    }
  },

  onInputChange (e) {
    let value = e.target.value
    let time = moment(value, dateFormats.humanTime)
    this.time = time
    this.props.onChange(time.format(dateFormats.time))
  },

  onInputFocus () {
    this.refs.popunder.openPopunder()
  },

  onTimeClick (time, e) {
    e.preventDefault()
    this.time = time
    this.setState({
      inputValue: time.format(dateFormats.humanTime)
    }, () => {
      // We have to explicitly set the value of the input
      let inputEl = ReactDOM.findDOMNode(this.refs.timeInput)
      inputEl.value = this.state.inputValue
    })
    this.props.onChange(time.format(dateFormats.time))
  },

  /**
   * Render a list of human formatted times between midnight and midnight
   * @return {ReactElement} React element containing the list
   */
  renderTimeList () {
    // Get midnight
    let date = moment().set({
      hours: 0,
      minutes: 0,
      seconds: 0
    })
    // Get the end of the day
    let end = moment().endOf('day')
    return (
      <ul>
        {this.renderTimeItem(date, [], end, this.time)}
      </ul>
    )
  },

  /**
   * Recursive function to render time items
   * @param  {Moment} date Context date object
   * @param  {Array} items Array of previous created elements
   * @param  {Moment} end A moment object representing the end of the day
   * @param  {Moment} active A moment object representing the currently selected time
   * @return {Array} Return the array of built up items (or recurse)
   */
  renderTimeItem (date, items, end, active) {
    if (end.diff(date) > 0) {
      // Check if active. We only care about hours/minutes
      let isActive = (active &&
        active.hours() === date.hours() &&
        active.minutes() === date.minutes()
      )
      let buttonClassNames = classNames(
        styles.button,
        {
          [`${styles.buttonActive}`]: isActive
        }
      )
      let item = <li key={date.format()} className={styles.item}>
        <button
          ref={(isActive) ? 'buttonActive' : null}
          className={buttonClassNames}
          onClick={function () {
            this.onTimeClick(date.clone())
          }}>
           {date.format(dateFormats.humanTime)}
        </button>
      </li>
      items.push(item)
      date = date.add(15, 'minutes')
      return this.renderTimeItem(date, items, end, active)
    } else {
      return items
    }
  },

  onPopunderOpen (e, domNode) {
    if (this.refs.buttonActive && this.refs.popunder.getContainer()) {
      let buttonEl = ReactDOM.findDOMNode(this.refs.buttonActive)
      let containerEl = ReactDOM.findDOMNode(this.refs.popunder.getContainer())
      containerEl.scrollTop = buttonEl.offsetTop
    }
  },

  render () {
    let { error, placeholder } = this.props

    return (
      <div className={styles.base}>
        <Popunder ref='popunder' closeOnEsc closeOnOutsideClick onOpen={this.onPopunderOpen}>
          <Input
            ref='timeInput'
            defaultValue={this.state.inputValue}
            error={error}
            placeholder={placeholder || 'Select or enter a time'}
            onFocus={this.onInputFocus}
            onChange={this.onInputChange} />
          {this.renderTimeList()}
        </Popunder>
      </div>
    )
  }
})

export default TimePicker
