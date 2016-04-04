/**
 * Iterate over an array of objects with the form:
 *
 *   {name: 'foo', component: ReactComponent}
 *
 * And return the `.component` that matches `name`
 *
 * @param  {Array} components Array of component names/definitions
 * @param  {String} name Component name to match against
 * @return {ReactComponent/Boolean} Matching React component (or false)
 */
export default function extractComponent (components, name) {
  let component = false
  components.forEach((c) => {
    if (c.name === name) {
      component = c.component
    }
  })
  return component
}
