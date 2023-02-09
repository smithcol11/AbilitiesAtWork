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
  label: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  required: {
    default: false,
  },
});
</script>
<template>
  <div v-if="label != null">
    <label class="form-label inline-block text-gray-700">{{ label }}</label>
  </div>

  <input
    :type="type"
    class="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-accentLight rounded"
    :placeholder="placeholder"
    :value="modelValue"
    :name="name"
    :id="id"
    :required="required"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
