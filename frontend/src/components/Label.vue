<script setup>
const props = defineProps({
  position: {
    type: String,
    default: "middle",
  },
  text: {
    type: String,
    default: "label text",
  },
});
</script>

<template>
  <div v-if="position == 'left'">
    <label class="block text-left"> {{ text }} </label>
  </div>
  <div v-else-if="position == 'right'">
    <label class="block text-right"> {{ text }} </label>
  </div>
  <div v-else>
    <label class="block">{{ text }} </label>
  </div>
</template>
