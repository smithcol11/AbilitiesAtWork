<script setup>
import { computed, watch, reactive } from "vue";
import Multiselect from "@vueform/multiselect";
import { useDark } from "@vueuse/core";
const isDark = reactive(useDark());
watch (() => isDark, (newvalue) => {console.log(newvalue);});
// const state = computed(() => isDark.value ? true : false);
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
    v-if="isDark == false"
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
  <multiselect
    v-if="isDark == true"
    v-bind="$attrs"
    class="dark-vueform-multiselect"
    :options="options"
    :clear-on-select="true"
    :preserve-search="true"
    :searchable="true"
    :placeholder="placeholder"
  >
  </multiselect>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
