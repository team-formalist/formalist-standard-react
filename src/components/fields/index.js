import React from 'react'
import Container from './container'
import CheckBox from './check-box'
import DateField from './date-field'
import DateTimeField from './date-time-field'
import HiddenField from './hidden-field'
import MultiSelectionField from './multi-selection-field'
import NumberField from './number-field'
import RadioButtons from './radio-buttons'
import RichTextArea from './rich-text-area'
import SelectBox from './select-box'
import SelectionField from './selection-field'
import TextArea from './text-area'
import TextField from './text-field'
import MultiUploadField from './multi-upload-field'
import UploadField from './upload-field'

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField (field, config = {}, globalConfig = {}) {
  return (fieldProps) => {
    return (
      <Container field={field} config={config} globalConfig={globalConfig} {...fieldProps} />
    )
  }
}

/**
 * Wrapped fields for each type
 * @param {Object} config Config specific to the fields.
 * @type {Object}
 */
function fields (fieldsConfig = {}, globalConfig = {}) {
  return {
    checkBox: wrapField(CheckBox, config.checkBox),
    dateField: wrapField(DateField, config.dateField),
    dateTimeField: wrapField(DateTimeField, config.dateTimeField),
    hiddenField: wrapField(HiddenField, config.hiddenField),
    multiSelectionField: wrapField(MultiSelectionField, config.multiSelectionField),
    multiUploadField: wrapField(MultiUploadField, fieldsConfig.multiUploadField, globalConfig),
    numberField: wrapField(NumberField, config.numberField),
    radioButtons: wrapField(RadioButtons, config.radioButtons),
    richTextArea: wrapField(RichTextArea, config.richTextArea),
    selectBox: wrapField(SelectBox, config.selectBox),
    selectionField: wrapField(SelectionField, config.selectionField),
    textArea: wrapField(TextArea, config.textArea),
    textField: wrapField(TextField, config.textField),
    uploadField: wrapField(UploadField, fieldsConfig.uploadField, globalConfig),
  }
}

export default fields
