<script setup>
import { ref } from "vue";
const type = ref("");
const placeholder = ref("place holder");
const data = ref("");
</script>
<template>
  <input
    type="type"
    class="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-accentLight rounded"
    placeholder="placeholder"
    v-model="data"
  />
</template>
