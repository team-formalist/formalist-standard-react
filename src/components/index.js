import fields from './fields'
import { AttrFactory } from './attr'
import { GroupFactory } from './group'
import { ManyFactory } from './many'
import { SectionFactory } from './section'

export default function components (options = {}) {
  return {
    attr: AttrFactory,
    fields: fields(options.fields),
    group: GroupFactory,
    many: ManyFactory,
    section: SectionFactory
  }
}
