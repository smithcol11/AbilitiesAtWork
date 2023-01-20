<script setup>
import Multiselect from "@vueform/multiselect";
import { ref } from "vue";
const options = ref(["OPTION-1", "OPTION-2"]);
const choice = ref("Choice");
const placeholder = ref("");
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<template>
  <multiselect
    v-model="choice"
    :options="options"
    :clear-on-select="true"
    :preserve-search="true"
    :searchable="true"
    :placeholder="placeholder"
  >
  </multiselect>
</template>
