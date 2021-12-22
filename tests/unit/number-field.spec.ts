import { mount, shallowMount } from "@vue/test-utils";

import JsonSchemaForm, { NumberField } from "../../lib";

describe("JsonSchemaFrom", () => {
  it("should render correct number field", async () => {
    let value = "";
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: "number",
        },
        value: value,
        onChange: (v: string) => {
          value = v;
        },
      },
    });

    const numberField = wrapper.findComponent(NumberField);
    expect(numberField.exists()).toBeTruthy();
    // await numberField.props("onChange")("123");
    const input = numberField.find("input");
    input.element.value = "123";
    input.trigger("input");
    expect(value).toBe(123);
  });
});
