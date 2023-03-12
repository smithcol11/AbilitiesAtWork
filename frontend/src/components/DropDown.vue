<script setup>
import Multiselect from "@vueform/multiselect";
const props = defineProps({
  options: {
    default: ["OPTION-1", "OPTION-2"],
  },
  placeholder: {
    type: String,
    default: "Place holder text",
  },
  mode: {
    type: String,
    default: "single" // single, multiple, tags
  }
});
</script>

<template>
  <multiselect
    v-bind="$attrs"
    class="vueform-multiselect"
    :mode="mode"
    :options="options"
    :close-on-select="mode == 'single'"
    :clear-on-select="mode == 'single'"
    :hide-selected="false"
    :preserve-search="true"
    :searchable="true"
    :placeholder="placeholder"
  >
  </multiselect>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
