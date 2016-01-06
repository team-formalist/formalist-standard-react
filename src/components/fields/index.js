import React from 'react'
import Container from './container'
// import array from './array'
// import assets from './assets'
// import boolean from './boolean'
// import content from './content'
// import dateTime from './dateTime'
import float from './float'
import int from './int'
import string from './string'

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

/**
 * Wrapped fields for each type
 * @type {Object}
 */
const fields = {
  int: wrapField(int),
  // float and decimal fields are the same as far as JS is concerned
  decimal: wrapField(float),
  float: wrapField(float),
  string: wrapField(string)
}

export default fields
