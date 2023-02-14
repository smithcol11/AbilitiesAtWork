<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  buttonColor: {
    type: String,
    default: "accentDark-button",
  },
});
</script>
<template>
  <button :type="type" :class="buttonColor">{{ text }}</button>
</template>
