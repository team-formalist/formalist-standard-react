import test from "tape";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import isFunction from "isfunction";

/* fixtures */
import "./fixtures/ignore-styles";
import "./fixtures/dom";
import data from "./fixtures/data";

import standardFormTemplate from "../src";

import "./ui";
import "./fields";

// Configure enzyme
configure({ adapter: new Adapter() });

test("it should export a standard form template", nest => {
  nest.test("... returning a callable function", assert => {
    assert.ok(isFunction(standardFormTemplate), "compose form is a function");
    assert.end();
  });
});

test("it should create a standard form instance", nest => {
  let form = standardFormTemplate()(data);
  let wrapper = mount(<article>{form.render()}</article>);

  nest.test("... with different display types for inputs", assert => {
    const el = wrapper.find("input").at(0);
    const actual = el.prop("id");
    const expected = "text_field";
    assert.equal(expected, actual);
    assert.end();
  });

  nest.test("... that updates data", assert => {
    let expected = "Data has changed";
    let input = wrapper.find("input").at(0);

    form.on("change", () => {
      let actual = form.getState().getIn([0, 1, 2]);
      assert.equals(expected, actual);
      assert.end();
    });

    // Trigger the change
    input.simulate("change", { target: { value: expected } });
  });
});
