import {
  DefineComponent,
  defineComponent,
  ExtractPropTypes,
  inject,
} from "vue";
import { FieldPropsDefine } from "../types";
import { SchemaFormContextKey } from "../context";

const TypeHelperComponent = defineComponent({
  props: FieldPropsDefine,
});
type SchemaItemDefine = typeof TypeHelperComponent;

export default defineComponent({
  name: "ObjectField",
  props: FieldPropsDefine,
  setup(props) {
    const context: { SchemaItem: SchemaItemDefine } | undefined =
      inject(SchemaFormContextKey);

    if (!context) {
      throw Error("SchemaItem should be used.");
    }

    return () => {
      const { schema } = props;
      const { SchemaItem } = context;
      const properties = schema.properties || {};
      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem {...props} />
      ));
    };
  },
});
