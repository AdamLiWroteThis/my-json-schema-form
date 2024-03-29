import { defineComponent, PropType } from "vue";
import { FieldPropsDefine, Schema, SelectionWidgetNames } from "../types";
import { useVJSFContext } from "../context";
import { getWidget } from "../theme";
import { createUseStyles } from "vue-jss";

const useStyles = createUseStyles({
  container: {
    border: "1px solid #eee",
  },
  actions: {
    background: "#eee",
    padding: 10,
    textAlign: "right",
  },
  action: {
    "& + &": {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
});

const ArrayItemWrapper = defineComponent({
  name: "ArrayItemWrapper",
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles();

    const context = useVJSFContext();

    const hadleAdd = () => props.onAdd(props.index);
    const hadleDelete = () => props.onDelete(props.index);
    const hadleUp = () => props.onUp(props.index);
    const hadleDown = () => props.onDown(props.index);

    return () => {
      const classes = classesRef.value;

      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={hadleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={hadleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={hadleUp}>
              上移
            </button>
            <button class={classes.action} onClick={hadleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      );
    };
  },
});

export default defineComponent({
  name: "ArrayField",
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext();

    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];

      arr[index] = v;

      props.onChange(arr);
    };

    const handleAdd = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];

      arr.splice(index + 1, 0, undefined);

      props.onChange(arr);
    };

    const handleDelete = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];

      arr.splice(index, 1);

      props.onChange(arr);
    };

    const handleUp = (index: number) => {
      if (index === 0) return;

      const { value } = props;
      const arr = Array.isArray(value) ? value : [];

      const item = arr.splice(index, 1);
      arr.splice(index - 1, 0, item);

      props.onChange(arr);
    };

    const handleDown = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];

      if (index === arr.length - 1) return;

      const item = arr.splice(index, 1);
      arr.splice(index + 1, 0, item);

      props.onChange(arr);
    };

    const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget);

    return () => {
      // const SelectionWidget = context.theme.widgets.SelectionWidget;
      const SelectionWidget = SelectionWidgetRef.value;

      const { schema, rootSchema, value } = props;
      const SchemaItem = context.SchemaItem;
      const isMultiType = Array.isArray(schema.items);
      const isSelect = schema.items && (schema.items as any).enum;

      if (isMultiType) {
        const items: Schema[] = schema.items as any;
        const arr = Array.isArray(value) ? value : [];
        return items.map((s: Schema, index: number) => (
          <SchemaItem
            schema={s}
            key={index}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v: any) => handleArrayItemChange(v, index)}
          />
        ));
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : [];

        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaItem
                schema={schema.items as Schema}
                key={index}
                rootSchema={rootSchema}
                value={v}
                onChange={(v: any) => handleArrayItemChange(v, index)}
              />
            </ArrayItemWrapper>
          );
        });
      } else {
        const enumOptions = (schema as any).items.enum;
        const options = enumOptions.map((e: any) => ({
          key: e,
          value: e,
        }));
        return (
          <SelectionWidget
            onChange={props.onChange}
            value={props.value}
            options={options}
          />
        );
      }
    };
  },
});
