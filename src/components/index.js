import fields from "./fields";
import { AttrFactory } from "./attr";
import { CompoundFieldFactory } from "./compound-field";
import { GroupFactory } from "./group";
import { ManyFactory } from "./many";
import { ChildFormFactory } from "./child-form";
import { ManyChildFormsFactory } from "./many-child-forms";
import { SectionFactory } from "./section";
import { FormFieldFactory } from "./child-form-field";

export default function components(customComponents = {}, config = {}) {
  const base = {
    fields: fields(config.fields, config.global),
    attr: AttrFactory,
    compoundField: CompoundFieldFactory,
    group: GroupFactory,
    many: ManyFactory,
    childForm: ChildFormFactory,
    manyChildForms: ManyChildFormsFactory,
    section: SectionFactory,
    formField: FormFieldFactory,
  };
  return Object.assign(base, customComponents);
}
