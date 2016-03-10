import fields from './fields'
import {AttrFactory} from './attr'
import {CompoundFieldFactory} from './compound-field'
import {GroupFactory} from './group'
import {ManyFactory} from './many'
import {SectionFactory} from './section'

export default function components (options = {}) {
  return {
    fields: fields(options.fields),
    attr: AttrFactory,
    compoundField: CompoundFieldFactory,
    group: GroupFactory,
    many: ManyFactory,
    section: SectionFactory
  }
}
