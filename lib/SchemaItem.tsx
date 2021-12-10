import { defineComponent, PropType } from "vue";
import NumberField from "./fields/NumberField";
import StringField from "./fields/StringField";
import { Schema, SchemaTypes } from "./types";

export default defineComponent({
  name: "SchemaItem",
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { schema } = props;

      // TODO： 如果 type 没有指定，我们需要猜测这个 type
      const type = schema.type;
      let Component: any;
      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField;
          break;
        case SchemaTypes.NUMBER:
          Component = NumberField;
          break;
        default: {
          console.warn(`${type} is not supported`);
        }
      }
      return <Component {...props} />;
    };
  },
});
