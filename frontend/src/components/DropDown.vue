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
});
</script>

<template>
  <multiselect
    v-bind="$attrs"
    class="vueform-multiselect dark:bg-darkGrayAccent"
    :options="options"
    :clear-on-select="true"
    :preserve-search="true"
    :searchable="true"
    :placeholder="placeholder"
  >
  </multiselect>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
