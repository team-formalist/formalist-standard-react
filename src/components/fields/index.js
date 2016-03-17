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
function wrapField (field, config = {}) {
  return (fieldProps) => {
    return (
      <Container field={field} config={config} {...fieldProps} />
    )
  }
}

/**
 * Wrapped fields for each type
 * @param {Object} config Config specific to the fields.
 * @type {Object}
 */
function fields (config = {}) {
  return {
    checkBox: wrapField(CheckBox, config.checkBox),
    dateField: wrapField(DateField, config.dateField),
    dateTimeField: wrapField(DateTimeField, config.dateTimeField),
    numberField: wrapField(NumberField, config.numberField),
    radioButtons: wrapField(RadioButtons, config.radioButtons),
    selectBox: wrapField(SelectBox, config.selectBox),
    selectionField: wrapField(SelectionField, config.selectionField),
    textArea: wrapField(TextArea, config.textArea),
    textField: wrapField(TextField, config.textField)
  }
}

export default fields
