<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { FiledPropsDefine } from "../types";

export default {
  name: "StringField",
  props: FiledPropsDefine,
  methods: {
    handleChange(e) {
      console.log(e);
      this.onChange(e.target.value);
    },
  },
};
</script>
