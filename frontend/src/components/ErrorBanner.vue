<script setup>
const props = defineProps({
  topText: {
    type: String,
    default: "ERROR!",
  },
  bottomText: {
    type: String,
    default: "Something bad happened!",
  },
});
</script>
<template>
  <div class="bg-red-100 rounded-md p-3 flex">
    <svg 
      class="stroke-2 stroke-current text-red-600 h-8 w-8 mr-2 flex-shrink-0" 
      viewBox="0 0 24 24" fill="none"
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>

    <div class="text-red-700">
      <div class="font-bold text-xl">{{ props.topText }}</div>
      <div>{{ props.bottomText }}</div>
    </div>
  </div>
</template>
