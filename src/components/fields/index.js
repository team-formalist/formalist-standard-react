import React from 'react'
import Container from './container'
import CheckBox from './check-box'
import DateField from './date-field'
import DateTimeField from './date-time-field'
import NumberField from './number-field'
import RadioButtons from './radio-buttons'
import SelectBox from './select-box'
import SelectionField from './selection-field'
import TextField from './text-field'
import TextArea from './text-area'

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
    checkBox: wrapField(CheckBox, options.checkBox),
    dateField: wrapField(DateField, options.dateField),
    dateTimeField: wrapField(DateTimeField, options.dateTimeField),
    numberField: wrapField(NumberField, options.numberField),
    radioButtons: wrapField(RadioButtons, options.radioButtons),
    selectBox: wrapField(SelectBox, options.selectBox),
    selectionField: wrapField(SelectionField, options.selectionField),
    textArea: wrapField(TextArea, options.textArea),
    textField: wrapField(TextField, options.textField)
  }
}

export default fields
