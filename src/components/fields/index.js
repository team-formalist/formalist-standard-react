import React from 'react'
import Container from './container'
// import array from './array'
// import assets from './assets'
// import content from './content'
// import dateTime from './dateTime'
import bool, { displayVariants as boolDisplayVariants } from './bool'
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
function wrapField (field) {
  return (fieldProps) => {
    return (
      <Container field={field} {...fieldProps} />
    )
  }
}

export const displayVariants = {
  bool: boolDisplayVariants,
  int: intDisplayVariants,
  decimal: decimalDisplayVariants,
  float: floatDisplayVariants,
  string: stringDisplayVariants
}

/**
 * Wrapped fields for each type
 * @type {Object}
 */
const fields = {
  bool: wrapField(bool),
  int: wrapField(int),
  decimal: wrapField(decimal),
  float: wrapField(float),
  string: wrapField(string)
}

export default fields
