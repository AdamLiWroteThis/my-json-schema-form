<template>
  <input :value="value" type="number" @input="handleChange" />
</template>

<script lang="ts">
import { FiledPropsDefine } from "../types";

export default {
  name: "NumberField",
  props: FiledPropsDefine,
  methods: {
    handleChange(e) {
      console.log(e);
      this.onChange(e.target.value);
    },
  },
};
</script>
