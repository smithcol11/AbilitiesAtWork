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
  label: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div v-if="label != null">
    <label class="form-label inline-block text-gray-700">{{ label }}</label>
  </div>
  <multiselect
    v-bind="$attrs"
    class="vueform-multiselect"
    :options="options"
    :clear-on-select="true"
    :preserve-search="true"
    :searchable="true"
    :placeholder="placeholder"
  >
  </multiselect>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
