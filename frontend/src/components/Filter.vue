<script setup>
import { ref, watchEffect } from "vue";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (v) => ["date", "text", "single", "multi"].includes(v),
  },
  placeholder: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: [],
  },
  modelValue: {
    // use v-model
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const currentInput = ref(props.modelValue);

watchEffect(() => (currentInput.value = props.modelValue));

const onModelUpdate = (value) => {
  currentInput.value = value;
  emits("update:modelValue", currentInput.value);
};
</script>

<template>
  <Calendar 
    v-if="mode === 'date'"
    :placeholder="placeholder"
    :modelValue="currentInput"
    @update:modelValue="onModelUpdate($event)"
  />
  <InputText
    v-if="mode === 'text'"
    class="p-column-filter"
    type="text"
    :placeholder="placeholder"
    :modelValue="currentInput"
    @update:modelValue="onModelUpdate($event)"
  />
  <Dropdown
    v-if="mode === 'single'"
    class="p-dropdown-filter"
    :placeholder="placeholder"
    :options="options"
    :showClear="true"
    :modelValue="currentInput"
    @update:modelValue="($event) => onModelUpdate($event)"
  >
    <template #value="slotProps">
      <span :class="'p-dropdown-value' + slotProps.value" v-if="slotProps.value"
        >{{ slotProps.value }}
      </span>
      <span v-else>{{ slotProps.placeholder }}</span>
    </template>
    <template #option="slotProps">
      <span :class="'p-dropdown-option' + slotProps.option">{{
        slotProps.option
      }}</span>
    </template>
  </Dropdown>
  <MultiSelect
    v-if="mode === 'multi'"
    class="p-column-filter"
    :placeholder="placeholder"
    :options="options"
    :showClear="true"
    :modelValue="currentInput"
    @update:modelValue="($event) => onModelUpdate($event)"
  >
    <template #value="slotProps">
      <span
        :class="'p-dropdown' + slotProps.value"
        v-if="slotProps.value && slotProps.value.length > 0"
        >{{ slotProps.value.join(", ") }}
      </span>
      <span v-else>{{ slotProps.placeholder }}</span>
    </template>
    <template #option="slotProps">
      <span :class="'p-dropdown' + slotProps.option">{{
        slotProps.option
      }}</span>
    </template>
  </MultiSelect>
</template>
