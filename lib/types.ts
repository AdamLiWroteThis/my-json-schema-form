import { DefineComponent, defineComponent, PropType } from "vue";

export enum SchemaTypes {
  "NUMBER" = "number",
  "INTEGER" = "integer",
  "STRING" = "string",
  "OBJECT" = "object",
  "ARRAY" = "array",
  "BOOLEAN" = "boolean",
}

type SchemaRef = { $ref: string };

// type Schema = any
export interface Schema {
  type?: SchemaTypes | string;
  const?: any;
  format?: string;

  title?: string;
  default?: any;

  properties?: {
    [key: string]: Schema;
  };
  items?: Schema | Schema[] | SchemaRef;
  uniqueItems?: any;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[];
  enum?: any[];
  enumNames?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: Schema;

  minLength?: number;
  maxLength?: number;
  minimun?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}

export const FieldPropsDefine = {
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
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
} as const;

export const TypeHelperComponent = defineComponent({
  props: FieldPropsDefine,
});
export type CommonFieldType = typeof TypeHelperComponent;

const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
} as const;

const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<
      {
        key: string;
        value: any;
      }[]
    >,
    required: true,
  },
} as const;

type CommonWidgetDefine = DefineComponent<
  typeof CommonWidgetPropsDefine,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>;

type SelectionWidgetDefine = DefineComponent<
  typeof SelectionWidgetPropsDefine,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>;
export interface Theme {
  widgets: {
    SelectionWidget: SelectionWidgetDefine;
    TextWidget: CommonWidgetDefine;
    NumberWidget: CommonWidgetDefine;
  };
}
