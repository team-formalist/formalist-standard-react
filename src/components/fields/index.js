import React from 'react'
import Container from './container'
import CheckBox from './check_box'
import DateField from './date_field'
import DateTimeField from './date_time_field'
import NumberField from './number_field'
import RadioButtons from './radio_buttons'
import SelectBox from './select_box'
import TextField from './text_field'
import TextArea from './text_area'

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField (field, options = {}) {
  return (fieldProps) => {
    return (
      <Container field={field} options={options} {...fieldProps} />
    )
  }
}

/**
 * Wrapped fields for each type
 * @param {Object} options Options specific to the fields.
 * @type {Object}
 */
function fields (options = {}) {
  return {
    check_box: wrapField(CheckBox, options.check_box),
    date_field: wrapField(DateField, options.date_field),
    date_time_field: wrapField(DateTimeField, options.date_time_field),
    number_field: wrapField(NumberField, options.number_field),
    radio_buttons: wrapField(RadioButtons, options.radio_buttons),
    select_box: wrapField(SelectBox, options.select_box),
    text_area: wrapField(TextArea, options.text_area),
    text_field: wrapField(TextField, options.text_field)
  }
}

export default fields
