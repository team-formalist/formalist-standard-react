import fields from "./fields";
import { AttrFactory } from "./attr";
import { CompoundFieldFactory } from "./compound-field";
import { GroupFactory } from "./group";
import { ManyFactory } from "./many";
import { ChildFormFactory } from "./child-form";
import { ManyChildFormsFactory } from "./many-child-forms";
import { SectionFactory } from "./section";

export default function components() {
  var customComponents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var base = {
    fields: fields(config.fields, config.global),
    attr: AttrFactory,
    compoundField: CompoundFieldFactory,
    group: GroupFactory,
    many: ManyFactory,
    childForm: ChildFormFactory,
    manyChildForms: ManyChildFormsFactory,
    section: SectionFactory
  };
  return Object.assign(base, customComponents);
}