<script setup>
const props = defineProps({
  client: Object,
});
</script>

<template>
  <div class="font-bold pb-2 dark:text-light"> Matches for {{ client.firstName }} {{ client.middleInitial }}. {{ client.lastInitial }}. </div>
  <div class="text-sm dark:text-light">
    <div><span class="font-extralight italic dark:text-light">Preferences: </span>
       {{ client.preferences }} 
    </div>
    <div><span class="font-extralight italic dark:text-light">Industry: </span>
       {{ client.industry }} 
    </div>
    <div><span class="font-extralight italic dark:text-light">Hours: </span>
       {{ client.hours }} 
    </div>
  </div> 
</template>