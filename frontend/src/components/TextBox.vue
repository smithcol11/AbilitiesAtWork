<script setup>
// class="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-accentLight rounded"
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Place holder text",
  },
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  maxLength: {
    type: String,
    default: "524288",
  },
});
</script>

<template>
  <input
    :type="type"
    class="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-accentLight rounded"
    :placeholder="placeholder"
    :value="modelValue"
    :name="name"
    :id="id"
    :maxlength="maxLength"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
