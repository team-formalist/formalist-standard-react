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
import SearchSelectionField from './search-selection-field'
import SearchMultiSelectionField from './search-multi-selection-field'
import SelectBox from './select-box'
import SelectionField from './selection-field'
import TagsField from './tags-field'
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
    checkBox: wrapField(CheckBox, fieldsConfig.checkBox, globalConfig),
    dateField: wrapField(DateField, fieldsConfig.dateField, globalConfig),
    dateTimeField: wrapField(DateTimeField, fieldsConfig.dateTimeField, globalConfig),
    hiddenField: wrapField(HiddenField, fieldsConfig.hiddenField, globalConfig),
    multiSelectionField: wrapField(MultiSelectionField, fieldsConfig.multiSelectionField, globalConfig),
    numberField: wrapField(NumberField, fieldsConfig.numberField, globalConfig),
    radioButtons: wrapField(RadioButtons, fieldsConfig.radioButtons, globalConfig),
    richTextArea: wrapField(RichTextArea, fieldsConfig.richTextArea, globalConfig),
    searchSelectionField: wrapField(SearchSelectionField, fieldsConfig.searchSelectionField, globalConfig),
    searchMultiSelectionField: wrapField(SearchMultiSelectionField, fieldsConfig.searchMultiSelectionField, globalConfig),
    selectBox: wrapField(SelectBox, fieldsConfig.selectBox, globalConfig),
    selectionField: wrapField(SelectionField, fieldsConfig.selectionField, globalConfig),
    tagsField: wrapField(TagsField, fieldsConfig.tagsField, globalConfig),
    textArea: wrapField(TextArea, fieldsConfig.textArea, globalConfig),
    textField: wrapField(TextField, fieldsConfig.textField, globalConfig),
    multiUploadField: wrapField(MultiUploadField, fieldsConfig.multiUploadField, globalConfig),
    uploadField: wrapField(UploadField, fieldsConfig.uploadField, globalConfig),
  }
}

export default fields
