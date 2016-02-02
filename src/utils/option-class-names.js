export default function optionClassNames (styles, options) {
  if (!styles || !options) {
    return false
  }
  return options.toArray().map((option) => {
    return [`${styles[option]}`]
  })
}
