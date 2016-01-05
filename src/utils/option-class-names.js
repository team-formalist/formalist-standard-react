export default function optionClassNames (prefix, options) {
  if (!options) {
    return false
  }
  return options.toArray().map((option) => {
    return [`${prefix}--${option}`]
  })
}
