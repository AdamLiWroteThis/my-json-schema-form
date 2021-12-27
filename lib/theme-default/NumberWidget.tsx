import { CommonWidgetPropsDefine, CommonWidgetDefine } from "../types";
import { defineComponent } from "vue";

const NumberWidget: CommonWidgetDefine = defineComponent({
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      console.log(e);
      const value = e.target.value;
      e.target.value = props.value;
      props.onChange(value);
    };
    return () => {
      return (
        <input
          type="number"
          value={props.value as any}
          onInput={handleChange}
        />
      );
    };
  },
});

export default NumberWidget;
