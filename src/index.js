import composeForm from 'formalist-compose'
import formComponents from './components'
import { displayVariants } from './components/fields'
export const components = formComponents
export const fieldDisplayVariants = displayVariants

/**
 * Template
 * @param  {Object} options Configuration options
 * @return {Function} A form compose with a set of standard React component
 * (potentially augmented by the `options`)
 */
export default function template(options = {}) {
  return composeForm(formComponents(options))
}
