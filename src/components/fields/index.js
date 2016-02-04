import React from 'react'
import Container from './container'
// import array from './array'
// import assets from './assets'
// import content from './content'
import bool, { displayVariants as boolDisplayVariants } from './bool'
import date, { displayVariants as dateDisplayVariants } from './date'
import dateTime, { displayVariants as dateTimeDisplayVariants } from './date-time'
import decimal, { displayVariants as decimalDisplayVariants } from './decimal'
import float, { displayVariants as floatDisplayVariants } from './float'
import int, { displayVariants as intDisplayVariants } from './int'
import string, { displayVariants as stringDisplayVariants } from './string'

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField (field, options = {}) {
  let { displayVariants } = options
  return (fieldProps) => {
    return (
      <Container field={field} displayVariants={displayVariants} {...fieldProps} />
    )
  }
}

export const displayVariants = {
  bool: boolDisplayVariants,
  int: intDisplayVariants,
  date: dateDisplayVariants,
  dateTime: dateTimeDisplayVariants,
  decimal: decimalDisplayVariants,
  float: floatDisplayVariants,
  string: stringDisplayVariants
}

/**
 * Wrapped fields for each type
 * @param {Object} options Options specific to the fields.
 * @type {Object}
 */
function fields (options = {}) {
  return {
    bool: wrapField(bool, options.bool),
    int: wrapField(int, options.int),
    date: wrapField(date, options.date),
    date_time: wrapField(dateTime, options.dateTime),
    decimal: wrapField(decimal, options.decimal),
    float: wrapField(float, options.float),
    string: wrapField(string, options.string)
  }
}

export default fields
