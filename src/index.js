import composeForm from 'formalist-compose'
import formComponents from './components'
import { displayVariants } from './components/fields'
export default composeForm(formComponents)
export const components = formComponents
export const fieldDisplayVariants = displayVariants
